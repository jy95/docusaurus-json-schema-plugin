import React from "react"

import { getQualifierMessages } from "../utils/index"

import type { JSONSchema7, JSONSchema7TypeName } from "json-schema"
import type { WithRequired } from "./index"

type Props = {
  [x: string]: any
  schema: WithRequired<JSONSchema7, "type">
}

function createPrimitive(props: Props) {
  const { schema } = props
  let qualifierMessages = getQualifierMessages(schema)
  let type = Array.isArray(schema?.type)
    ? [...new Set(schema.type as JSONSchema7TypeName[])].join(" OR ")
    : (schema.type as JSONSchema7TypeName)

  return (
    <li>
      <div>
        <strong>{type}</strong>
        {schema?.format !== undefined && (
          <span style={{ opacity: "0.6" }}>{` ${schema.format}`}</span>
        )}
        {qualifierMessages !== undefined && (
          <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
            {qualifierMessages}
          </div>
        )}
        {schema?.description !== undefined && (
          <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
            {schema.description}
          </div>
        )}
      </div>
    </li>
  )
}

export default createPrimitive
