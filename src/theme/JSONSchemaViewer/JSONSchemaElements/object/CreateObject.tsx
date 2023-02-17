import React from "react"

import AdditionalProperties from "./AdditionalProperties"
import Properties from "./Properties"
import PatternProperties from "./PatternProperties"
import PropertyNames from "./PropertyNames"

import { QualifierMessages } from "../../utils/index"
import { useJSVOptionsContext } from "../../contexts/index"

import { ObjectLabel, TypeLabel } from "../../labels/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.Object
  nullable?: boolean
  description?: string
  [x: string]: any
}

export default function CreateObject(props: Props): JSX.Element {
  const { schema, nullable, description } = props
  const options = useJSVOptionsContext()

  let additionalProperties =
    schema.additionalProperties !== undefined &&
    typeof schema.additionalProperties !== "boolean" ? (
      <AdditionalProperties schema={schema} />
    ) : undefined
  let properties =
    schema.properties !== undefined ? <Properties schema={schema} /> : undefined
  let patternProperties = schema.patternProperties ? (
    <PatternProperties schema={schema} />
  ) : undefined
  let propertyNames = schema.propertyNames ? (
    <PropertyNames schema={schema} />
  ) : undefined

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <ObjectLabel />
      {properties !== undefined && <ul>{properties}</ul>}
      {patternProperties !== undefined && <ul>{patternProperties}</ul>}
      {propertyNames !== undefined && <ul>{propertyNames}</ul>}
      {additionalProperties !== undefined && <ul>{additionalProperties}</ul>}
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages
          schema={schema}
          options={options}
          nullable={nullable}
        />
      </div>
      {description !== undefined && (
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {description}
        </div>
      )}
    </>
  )
}
