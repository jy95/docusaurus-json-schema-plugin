// Utility functions to know which case we have
import { isArrayType, isNumeric, isObjectType, isStringType } from "./index"

import type { JSONSchema, JSONSchemaNS, TypeName } from "../types"

// generate a friendly name for the schema
// It has to cover nasty cases like omit the "type" that usually helps to know what we have here
function generateFriendlyName(schema: JSONSchema): string {
  // unlikely at this point but technically possible
  if (typeof schema === "boolean") {
    return "unknown"
  }

  // Some people maintaining schemas provide a friendly name by themself
  if (schema.title) {
    return schema.title
  }

  // handle both predefined formats (e.g. "time", "date-time" ,...) & additional attributes
  if (schema.format) {
    return schema.format
  }

  // String property
  if (isStringType(schema)) {
    return "string"
  }

  if (isNumeric(schema)) {
    // if "type" is indicated, use it like that
    if (schema.type !== undefined && !Array.isArray(schema.type)) {
      return schema.type as string
    }
    // Otherwise, assume it is "number"
    return "number"
  }

  // One of the common types around the world
  if (isObjectType(schema)) {
    return "object"
  }

  // One of the common types around the world
  if (isArrayType(schema)) {
    let typedSchema = schema as JSONSchemaNS.Array

    // No clear specifications about the contents of the array ?
    // KISS return the generic type
    if (
      [undefined, false].includes(typedSchema.items as any) &&
      [undefined, false].includes(typedSchema.prefixItems as any) &&
      typedSchema.contains === undefined
    ) {
      return "array"
    }

    // Now, we know that at least something exists to guess array type
    // The hardest part is that we could have some combinations
    let elements: string[] = []

    // 1) "prefixItems"
    if (Array.isArray(typedSchema.prefixItems)) {
      // Prefix items are the first entries in the array
      elements.push(
        ...typedSchema.prefixItems.map((subSchema) =>
          generateFriendlyName(subSchema)
        )
      )
    }

    // 2) "items"
    if (
      typedSchema.items !== undefined &&
      typeof typedSchema.items !== "boolean"
    ) {
      // Generify the process for both cases
      let items: JSONSchema[] = Array.isArray(typedSchema.items)
        ? typedSchema.items
        : [typedSchema.items]

      // add items to entries
      elements.push(
        ...items.map((subSchema) => generateFriendlyName(subSchema))
      )
    }

    // 3) "contains"
    if (typedSchema.contains !== undefined) {
      // add contains to entries
      elements.push(...["...", generateFriendlyName(typedSchema.contains)])
    }

    // 4) Is it a open tuple ?
    if (!(typedSchema.items === false || schema.additionalItems === false)) {
      // notify the user
      elements.push("...")
    }

    return `(${elements.join(",")})[]`
  }

  // In "not" case, usual it is simple but I prefer to run recursively to be sure
  if (schema.not) {
    return `NOT (${generateFriendlyName(schema.not)})`
  }

  // With anyOf / allOf / oneOf, we could have some circular reference(s)
  // As using @stoplight $ref resolver, we don't have to care for that (at least for now ...)
  if (schema.anyOf || schema.oneOf || schema.allOf) {
    const linkWord = schema.anyOf ? "OR" : schema.oneOf ? "XOR" : "AND"
    const elements = (
      schema.anyOf ||
      schema.oneOf ||
      (schema.allOf as JSONSchema[])
    ).map((subSchema) => generateFriendlyName(subSchema))
    const uniqueItems = [...new Set(elements)]

    return uniqueItems.join(` ${linkWord} `)
  }

  // When multiple types are provided, resolution becomes hard to understand
  // I will just concat the result without duplicate
  if (Array.isArray(schema.type)) {
    return [...new Set(schema.type as TypeName[])].join(" OR ")
  } else {
    // Default return the type or "unknown" as fallback
    return (schema.type as TypeName | undefined) || "unknown"
  }
}

export default generateFriendlyName
