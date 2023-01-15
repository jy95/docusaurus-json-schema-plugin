import React from "react"
import {
  RenderAnyOneOf,
  CreateProperties,
  CreateItems,
  CreateAdditionalProperties,
  CreatePrimitive,
} from "./index"

import type { JSONSchema7, JSONSchema7Definition } from "json-schema"
import type { WithRequired } from "./index"

type Props = {
  [x: string]: any
  schema: JSONSchema7Definition
}

// Creates a hierarchical level of a schema tree. Nodes produce edges that can branch into sub-nodes with edges, recursively
function createNodes(props: Props): JSX.Element {
  const { schema } = props

  // fast fail over
  if (typeof schema === "boolean") {
    return <></>
  }

  // For typescript type
  let typedSchema = schema as JSONSchema7

  // AnyOf / oneOf schema
  if (typedSchema?.oneOf !== undefined || typedSchema?.anyOf !== undefined) {
    return (
      <RenderAnyOneOf
        schema={
          typedSchema as
            | WithRequired<JSONSchema7, "oneOf">
            | WithRequired<JSONSchema7, "anyOf">
        }
      />
    )
  }

  // Properties
  if (typedSchema?.properties !== undefined) {
    return (
      <CreateProperties
        schema={typedSchema as WithRequired<JSONSchema7, "properties">}
      />
    )
  }

  // additionalProperties
  if (typedSchema?.additionalProperties !== undefined) {
    return (
      <CreateAdditionalProperties
        schema={
          typedSchema as WithRequired<JSONSchema7, "additionalProperties">
        }
      />
    )
  }

  // Items
  if (typedSchema?.items !== undefined) {
    return CreateItems(typedSchema.items as WithRequired<JSONSchema7, "items">)
  }

  // TODO unsupported stuff (later)
  // 2. additionalItems

  // primitive type
  if (typedSchema?.type !== undefined) {
    return (
      <CreatePrimitive
        schema={typedSchema as WithRequired<JSONSchema7, "type">}
      />
    )
  }

  // Unknown node/schema type should return nothing
  return <></>
}

export default createNodes
