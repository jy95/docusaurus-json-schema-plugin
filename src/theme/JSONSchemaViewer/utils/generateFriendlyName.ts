// Utility functions to know which case we have
import { isArrayType, isNumeric, isObjectType, isStringType } from "./index"

import type { JSONSchema, TypeName } from "../types"

// generate a friendly name for the schema
// It has to cover nasty cases like omit the "type" that usually helps to know what we have here
function generateFriendlyName(schema: JSONSchema): string {
  // unlikely at this point but technically possible
  if (typeof schema === "boolean") {
    return "boolean"
  }

  // Some people maintaining schemas provide a friendly name by themself
  if (schema?.title) {
    return schema.title
  }

  // handle both predefined formats (e.g. "time", "date-time" ,...) & additional attributes
  if (schema?.format) {
    return schema.format
  }

  // String property
  if (isStringType(schema)) {
    return "string"
  }

  if (isNumeric(schema)) {
    // if "type" is indicated, use it like that
    if (schema?.type !== undefined && !Array.isArray(schema?.type)) {
      return schema?.type as string
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
    // Items property give the type of the array, when present
    if (schema?.items !== undefined && typeof schema?.items !== "boolean") {
      const linkWord = "OR"

      let list = Array.isArray(schema.items)
        ? schema.items
        : ([schema.items] as JSONSchema[])
      const elements = list.map((subSchema) => generateFriendlyName(subSchema))
      const uniqueItems = [...new Set(elements)]

      return `(${uniqueItems.join(` ${linkWord} `)})[]`
    }
    // Contains property give the type of the array, when present
    if (schema?.contains !== undefined) {
      return `(${generateFriendlyName(schema?.contains)})[]`
    }
    // Otherwise keep the plain old array type
    return "array"
  }

  // In "not" case, usual it is simple but I prefer to run recursively to be sure
  if (schema?.not) {
    return `NOT (${generateFriendlyName(schema.not)})`
  }

  // With anyOf / allOf / oneOf, we could have some circular reference(s)
  // As using @stoplight $ref resolver, we don't have to care for that (at least for now ...)
  if (schema?.anyOf || schema?.oneOf || schema?.allOf) {
    const linkWord = schema?.anyOf ? "OR" : schema?.oneOf ? "XOR" : "AND"
    const elements = (
      schema?.anyOf ||
      schema?.oneOf ||
      (schema?.allOf as JSONSchema[])
    ).map((subSchema) => generateFriendlyName(subSchema))
    const uniqueItems = [...new Set(elements)]

    return uniqueItems.join(` ${linkWord} `)
  }

  // When multiple types are provided, resolution becomes hard to understand
  // I will just concat the result without duplicate
  if (Array.isArray(schema?.type)) {
    return [...new Set(schema.type as TypeName[])].join(" OR ")
  } else {
    // Default return the type or "unknown" as fallback
    return (schema?.type as TypeName | undefined) || "unknown"
  }
}

export default generateFriendlyName
