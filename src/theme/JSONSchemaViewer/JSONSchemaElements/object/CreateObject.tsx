import React from "react"

import AdditionalProperties from "./AdditionalProperties"
import Properties from "./Properties"
import PatternProperties from "./PatternProperties"
import PropertyNames from "./PropertyNames"
import UnlistedProperties from "./UnlistedRequiredProperties"
import UnevaluatedProperties from "./UnevaluatedProperties"

import { QualifierMessages } from "../../utils/index"
import { useJSVOptionsContext } from "../../contexts/index"

import { ObjectLabel, TypeLabel } from "../../labels/index"

import { CreateDescription } from "../index"

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

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <ObjectLabel />
      <UnlistedProperties schema={schema} />
      <Properties schema={schema} />
      <PatternProperties schema={schema} />
      <PropertyNames schema={schema} />
      <AdditionalProperties schema={schema} />
      <UnevaluatedProperties schema={schema} />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages
          schema={schema}
          options={options}
          nullable={nullable}
        />
      </div>
      {description !== undefined && (
        <CreateDescription description={description} />
      )}
    </>
  )
}
