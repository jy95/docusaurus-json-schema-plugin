import React from "react"

import { QualifierMessages } from "@theme/JSONSchemaViewer/utils/index"

import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts/index"

import { TypeLabel, NumberLabel } from "@theme/JSONSchemaViewer/labels/index"

import { CreateDescription } from "@theme/JSONSchemaViewer/JSONSchemaElements/index"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  nullable?: boolean
  description?: string
  schema: JSONSchemaNS.Number
}

export default function CreateNumber(props: Props): JSX.Element {
  const { schema, description, nullable } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <NumberLabel />
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
