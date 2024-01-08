import React from "react"

// Utility functions to know which case we have
import { detectedTypes } from "@theme/JSONSchemaViewer/utils"

import { TypeLabelSwitch } from "@theme/JSONSchemaViewer/components"

import {
  AndLabel,
  NotLabel,
  OrLabel,
  XorLabel,
} from "@theme/JSONSchemaViewer/labels"

import type {
  JSONSchema,
  JSONSchemaNS,
  TypeValues,
} from "@theme/JSONSchemaViewer/types"

// common function I need below
function shouldAddSeparator(idx: number, length: number): boolean {
  // Not useful to add an separator for [], [item] situations
  if (length <= 1) {
    return false
  }
  // Otherwise
  return idx !== length - 1
}

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
          <CustomizeType schema={schema} type={type} />
          {shouldAddSeparator(idx, foundTypes.length) && <OrLabel />}
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

    // In order to have unique elements

    // Return result
    return (
      <>
        {elements.map((elem, idx) => (
          <React.Fragment key={idx}>
            <GenerateFriendlyName schema={elem} />
            {shouldAddSeparator(idx, elements.length) && LINKWORD}
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

  // For constant values
  if (!["array", "object"].includes(type)) {
    if (schema.const !== undefined) {
      return <code>{`${JSON.stringify(schema.const)}`}</code>
    }
    if (schema.enum !== undefined && schema.enum.length === 1) {
      return <code>{`${JSON.stringify(schema.enum[0])}`}</code>
    }
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
      ...schema.prefixItems.map((subSchema, idx) => (
        <GenerateFriendlyName schema={subSchema} key={`prefixItems_${idx}`} />
      )),
    )
  }

  // 2) "items"
  if (schema.items !== undefined && typeof schema.items !== "boolean") {
    // Generify the process for both cases
    let items = Array.isArray(schema.items) ? schema.items : [schema.items!]

    // add items to entries
    elements.push(
      ...items.map((subSchema, idx) => (
        <GenerateFriendlyName schema={subSchema} key={`items_${idx}`} />
      )),
    )
  }

  // 2B) "additionalItems" (to cover cases for specs below the draft-2020-12 version)
  if (
    schema.additionalItems !== undefined &&
    typeof schema.additionalItems !== "boolean"
  ) {
    // add items to entries
    elements.push(
      <GenerateFriendlyName
        schema={schema.additionalItems}
        key={"additionalItems"}
      />,
    )
  }

  // 2C) "unevaluatedItems" (to cover cases specs >= draft-2020-12 version)
  if (
    schema.unevaluatedItems !== undefined &&
    typeof schema.unevaluatedItems !== "boolean"
  ) {
    // add items to entries
    elements.push(
      <GenerateFriendlyName
        schema={schema.unevaluatedItems}
        key={"unevaluatedItems"}
      />,
    )
  }

  // 3) "contains"
  if (schema.contains !== undefined) {
    // add contains to entries
    elements.push(
      ...[
        <React.Fragment key={"before_contains"}>{"..."}</React.Fragment>,
        <GenerateFriendlyName schema={schema.contains} key={"contains"} />,
      ],
    )
  }

  // 4) Is it a open tuple ?
  if (
    !(
      (schema as JSONSchemaNS.Array).unevaluatedItems === false ||
      schema.items === false ||
      schema.additionalItems === false
    )
  ) {
    // notify the user
    elements.push(
      ...[<React.Fragment key={"open_tuple"}>{"..."}</React.Fragment>],
    )
  }

  // result time
  return (
    <>
      {"("}
      {elements.map((elem, idx) => (
        <React.Fragment key={idx}>
          {elem}
          {shouldAddSeparator(idx, elements.length) && ","}
        </React.Fragment>
      ))}
      {")[]"}
    </>
  )
}
