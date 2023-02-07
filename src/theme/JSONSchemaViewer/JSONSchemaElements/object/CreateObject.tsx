import React from "react"

import Translate from "@docusaurus/Translate"

import AdditionalProperties from "./AdditionalProperties"
import Properties from "./Properties"
import PatternProperties from "./PatternProperties"
import PropertyNames from "./PropertyNames"

import { QualifierMessages } from "../../utils/index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

function createObject(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <></>
  }

  let additionalProperties =
    schema.additionalProperties !== undefined &&
    typeof schema.additionalProperties !== "boolean" ? (
      <AdditionalProperties schema={schema} />
    ) : undefined
  let properties =
    schema.properties !== undefined ? (
      <Properties schema={schema} />
    ) : undefined
  let patternProperties = schema.patternProperties ? (
    <PatternProperties schema={schema} />
  ) : undefined
  let propertyNames = schema.propertyNames ? (
    <PropertyNames schema={schema} />
  ) : undefined

  // Translated labels
  const typeLabel = (
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
  )

  const typeObjectLabel = (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.object",
        }}
      >
        {"object"}
      </Translate>
    </span>
  )

  return (
    <>
      {typeLabel}
      &nbsp;&#58;&nbsp;
      {typeObjectLabel}
      {properties !== undefined && <ul>{properties}</ul>}
      {patternProperties !== undefined && <ul>{patternProperties}</ul>}
      {propertyNames !== undefined && <ul>{propertyNames}</ul>}
      {additionalProperties !== undefined && <ul>{additionalProperties}</ul>}
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages schema={schema} />
      </div>
      {schema.description !== undefined && (
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {schema.description}
        </div>
      )}
    </>
  )
}

export default createObject
