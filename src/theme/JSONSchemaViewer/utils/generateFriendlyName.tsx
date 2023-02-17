import React from "react"

// Utility functions to know which case we have
import { detectedTypes } from "./index"

import { TypeLabelSwitch } from "../components/index"

import { AndLabel, NotLabel, OrLabel, XorLabel } from "../labels/index"

import type { JSONSchema, JSONSchemaNS, TypeValues } from "../types"

// generate a friendly name for the schema
// It has to cover nasty cases like omit the "type" that usually helps to know what we have here
export default function GenerateFriendlyName({
  schema,
}: {
  schema: JSONSchema
}): JSX.Element {
  // In case the schema is always valid or not
  if (typeof schema === "boolean") {
    return <TypeLabelSwitch type={schema} />
  }

  // Some people maintaining schemas provide a friendly name by themself
  if (schema.title) {
    return <>{schema.title}</>
  }

  // See which types are available
  const foundTypes = detectedTypes(schema)

  // If no types were found, let's use fallback trick
  if (foundTypes.length === 0) {
    return <FallbackFriendlyName schema={schema} />
  }

  // Return types, and customize them if needed
  return (
    <>
      {foundTypes.map((type, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && idx !== foundTypes.length - 1 && <OrLabel />}
          <CustomizeType schema={schema} type={type} />
        </React.Fragment>
      ))}
    </>
  )
}

// generate a friendly name when no type is present
function FallbackFriendlyName({
  schema,
}: {
  schema: Exclude<JSONSchema, true | false>
}): JSX.Element {
  // 1. we have a Schema Composition case (not, allOf, ...)

  // 1A) the "not" case
  if (schema.not !== undefined) {
    return (
      <>
        <NotLabel />
        {" ( "}
        <GenerateFriendlyName schema={schema.not} />
        {" ) "}
      </>
    )
  }

  // the "allOf" / "oneOf" / "anyOf"
  if (schema.anyOf || schema.oneOf || schema.allOf) {
    // The linkword for the result
    const LINKWORD = schema.anyOf ? (
      <OrLabel />
    ) : schema.oneOf ? (
      <XorLabel />
    ) : (
      <AndLabel />
    )

    // Generify the process
    const elements = schema.allOf || schema.anyOf || schema.oneOf!

    // Return result
    return (
      <>
        {elements.map((elem, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && idx !== elements.length - 1 && LINKWORD}
            <GenerateFriendlyName schema={elem} />
          </React.Fragment>
        ))}
      </>
    )
  }

  // 2. Assume it is "any" by default
  return <TypeLabelSwitch type={true} />
}

// Customize type display to human friendly way
type CustomizeProps = {
  schema: Exclude<JSONSchema, true | false>
  type: TypeValues | string
}

function CustomizeType({ schema, type }: CustomizeProps): JSX.Element {
  // Use format when used with string
  // handle both predefined formats (e.g. "time", "date-time" ,...) & additional
  if (type === "string" && schema.format !== undefined) {
    return <TypeLabelSwitch type={schema.format} />
  }

  // For "array"
  if (type === "array") {
    return <CustomizeArray schema={schema as JSONSchemaNS.Array} />
  }

  // By default, render the type as it
  return <TypeLabelSwitch type={type} />
}

// Customize array display
function CustomizeArray({
  schema,
}: {
  schema: JSONSchemaNS.Array
}): JSX.Element {
  // No clear specifications about the contents of the array ?
  // KISS return the generic type
  if (
    [undefined, false].includes(schema.items as any) &&
    [undefined, false].includes(schema.prefixItems as any) &&
    schema.contains === undefined
  ) {
    return <TypeLabelSwitch type={"array"} />
  }

  // Now, we know that at least something exists to guess array type
  // The hardest part is that we could have some combinations
  let elements: JSX.Element[] = []

  // 1) "prefixItems"
  if (Array.isArray(schema.prefixItems)) {
    // Prefix items are the first entries in the array
    elements.push(
      ...schema.prefixItems.map((subSchema) => (
        <GenerateFriendlyName schema={subSchema} />
      ))
    )
  }

  // 2) "items"
  if (schema.items !== undefined && typeof schema.items !== "boolean") {
    // Generify the process for both cases
    let items = Array.isArray(schema.items) ? schema.items : [schema.items!]

    // add items to entries
    elements.push(
      ...items.map((subSchema) => <GenerateFriendlyName schema={subSchema} />)
    )
  }

  // 3) "contains"
  if (schema.contains !== undefined) {
    // add contains to entries
    elements.push(
      ...[<>{"..."}</>, <GenerateFriendlyName schema={schema.contains} />]
    )
  }

  // 4) Is it a open tuple ?
  if (!(schema.items === false || schema.additionalItems === false)) {
    // notify the user
    elements.push(...[<>{"..."}</>])
  }

  // result time
  return (
    <>
      {"("}
      {elements.map((elem, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && idx !== elements.length - 1 && ","}
          {elem}
        </React.Fragment>
      ))}
      {")[]"}
    </>
  )
}
