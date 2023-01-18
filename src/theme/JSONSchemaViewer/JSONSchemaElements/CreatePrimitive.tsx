import React from "react"

import {
  QualifierMessages,
  isNumeric,
  isStringType,
  QUALIFIER_MESSAGES_EMPTY_KEY,
} from "../utils/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  [x: string]: any
  schema: JSONSchema7
}

// Accurately identify the type
function detectType(schema: JSONSchema7): string {
  let providedType = Array.isArray(schema?.type)
    ? [...new Set(schema.type)].join(" OR ")
    : schema?.type

  if (providedType !== undefined) {
    return providedType
  }

  if (isStringType(schema)) {
    return "string"
  }

  if (isNumeric(schema)) {
    return "numeric"
  }

  // if nothing match, could be null or boolean
  return "unknown"
}

// To deal with anything that isn't an array or object
// In short : integer / number / boolean / null
function createPrimitive(props: Props) {
  const { schema } = props
  let qualifierMessages = <QualifierMessages schema={schema} />
  let type = detectType(schema)

  return (
    <div>
      <strong>{type}</strong>
      {schema?.format !== undefined && (
        <span style={{ opacity: "0.6" }}>{` ${schema.format}`}</span>
      )}
      {qualifierMessages.key !== QUALIFIER_MESSAGES_EMPTY_KEY && (
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
  )
}

export default createPrimitive
