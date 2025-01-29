import React from "react"

import { QualifierMessages } from "@theme/JSONSchemaViewer/utils"

import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts"

import { TypeLabel, IntegerLabel } from "@theme/JSONSchemaViewer/labels"

import { CreateDescription } from "@theme/JSONSchemaViewer/JSONSchemaElements"

import type { JSX } from "react"
import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  nullable?: boolean
  description?: string
  schema: JSONSchemaNS.Integer
}

export default function CreateInteger(props: Props): JSX.Element {
  const { schema, nullable, description } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <IntegerLabel />
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
