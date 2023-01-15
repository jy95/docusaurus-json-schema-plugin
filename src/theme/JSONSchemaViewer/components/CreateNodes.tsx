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
  if (typeof schema === "boolean" || schema === undefined) {
    return <></>
  }

  // For typescript type
  let typedSchema = schema as JSONSchema7

  // TODO unsupported stuff (later)
  // 2. additionalItems

  // Unknown node/schema type will return nothing (<></>)
  return (
    <>
      {/* Type */}
      {typedSchema?.type !== undefined && (
        <CreatePrimitive
          key={"type"}
          schema={typedSchema as WithRequired<JSONSchema7, "type">}
        />
      )}
      {/* Handle oneOf / anyOf */}
      {(typedSchema?.oneOf !== undefined ||
        typedSchema?.anyOf !== undefined) && (
        <RenderAnyOneOf
          key={"oneOf_anyOf"}
          schema={
            typedSchema as
              | WithRequired<JSONSchema7, "oneOf">
              | WithRequired<JSONSchema7, "anyOf">
          }
        />
      )}
      {/* Properties */}
      {typedSchema?.properties !== undefined && (
        <CreateProperties
          key={"properties"}
          schema={typedSchema as WithRequired<JSONSchema7, "properties">}
        />
      )}
      {/* additionalProperties */}
      {typedSchema?.additionalProperties !== undefined && (
        <CreateAdditionalProperties
          key={"additionalProperties"}
          schema={
            typedSchema as WithRequired<JSONSchema7, "additionalProperties">
          }
        />
      )}
      {/* Items */}
      {typedSchema?.items !== undefined && (
        <CreateItems
          key={"items"}
          schema={typedSchema.items as WithRequired<JSONSchema7, "items">}
        />
      )}
    </>
  )
}

export default createNodes
