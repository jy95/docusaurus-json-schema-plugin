import React from "react"

import Translate from "@docusaurus/Translate"

import AdditionalProperties from "./AdditionalProperties"
import Properties from "./Properties"
import PatternProperties from "./PatternProperties"

import type { JSONSchema7 } from "json-schema"

type Props = {
  schema: JSONSchema7
  [x: string]: any
}

function createObject(props: Props): JSX.Element {
  const { schema } = props

  let additionalProperties =
    schema?.additionalProperties !== undefined &&
    typeof schema.additionalProperties !== "boolean" ? (
      <AdditionalProperties schema={schema} />
    ) : undefined
  let properties =
    schema?.properties !== undefined ? (
      <Properties schema={schema} />
    ) : undefined
  let patternProperties = schema?.patternProperties ? (
    <PatternProperties schema={schema} />
  ) : undefined

  // TODO
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
      <span style={{ opacity: "0.6" }}>
        <Translate
          values={{
            id: "json-schema.keywords.object",
          }}
        >
          {"object"}
        </Translate>
      </span>
      {properties !== undefined && <ul>{properties}</ul>}
      {patternProperties !== undefined && <ul>{patternProperties}</ul>}
      {additionalProperties !== undefined && <ul>{additionalProperties}</ul>}
    </>
  )
}

export default createObject
