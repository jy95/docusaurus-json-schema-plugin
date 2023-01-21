import React from "react"

import Translate from "@docusaurus/Translate"

import { QualifierMessages, isNumeric, isStringType } from "../utils/index"

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
  let type = detectType(schema)
  let friendly_type = schema?.format ? `${type} (${schema.format})` : type

  return (
    <>
      <strong>
        <Translate
          values={{
            id: "json-schema.keywords.type",
            count: 1,
          }}
        >
          {"type"}
        </Translate>
      </strong>
      &nbsp;&#58;&nbsp;
      <span style={{ opacity: "0.6" }}>{friendly_type}</span>
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages schema={schema} />
      </div>
      {schema?.description !== undefined && (
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {schema.description}
        </div>
      )}
    </>
  )
}

export default createPrimitive
