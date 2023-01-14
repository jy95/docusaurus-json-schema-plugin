import React, { ReactNode } from "react"
import {
  RenderAnyOneOf,
  CreateProperties,
  CreateItems,
  CreateAdditionalProperties,
} from "./index"
import { getQualifierMessages } from "../utils/index"

import type {
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7TypeName,
} from "json-schema"
import type { WithRequired } from "./index"

// Creates a hierarchical level of a schema tree. Nodes produce edges that can branch into sub-nodes with edges, recursively.

function createNodes(schema: JSONSchema7Definition): ReactNode {
  // fast fail over
  if (typeof schema === "boolean") {
    return undefined
  }

  // For typescript type
  let typedSchema = schema as JSONSchema7

  // AnyOf / oneOf schema
  if (typedSchema?.oneOf !== undefined || typedSchema?.anyOf !== undefined) {
    return RenderAnyOneOf(
      typedSchema as
        | WithRequired<JSONSchema7, "oneOf">
        | WithRequired<JSONSchema7, "anyOf">
    )
  }

  // Properties
  if (typedSchema?.properties !== undefined) {
    return CreateProperties(
      typedSchema as WithRequired<JSONSchema7, "properties">
    )
  }

  // additionalProperties
  if (typedSchema?.additionalProperties !== undefined) {
    return CreateAdditionalProperties(
      typedSchema as WithRequired<JSONSchema7, "additionalProperties">
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
    let qualifierMessages = getQualifierMessages(typedSchema)
    let type = Array.isArray(typedSchema?.type)
      ? [...new Set(typedSchema.type as JSONSchema7TypeName[])].join(" OR ")
      : (typedSchema.type as JSONSchema7TypeName)

    return (
      <li>
        <div>
          <strong>{type}</strong>
          {typedSchema?.format !== undefined && (
            <span style={{ opacity: "0.6" }}>{` ${typedSchema.format}`}</span>
          )}
          {qualifierMessages !== undefined && (
            <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
              {qualifierMessages}
            </div>
          )}
          {typedSchema?.description !== undefined && (
            <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
              {typedSchema.description}
            </div>
          )}
        </div>
      </li>
    )
  }

  // Unknown node/schema type should return undefined
  return undefined
}

export default createNodes
