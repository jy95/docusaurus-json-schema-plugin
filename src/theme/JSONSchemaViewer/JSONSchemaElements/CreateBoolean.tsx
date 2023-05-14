import React from "react"

import { QualifierMessages } from "@theme/JSONSchemaViewer/utils/index"

import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts/index"

import { TypeLabel, BooleanLabel } from "@theme/JSONSchemaViewer/labels/index"

import { CreateDescription } from "@theme/JSONSchemaViewer/JSONSchemaElements/index"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  nullable?: boolean
  description?: string
  schema: JSONSchemaNS.Boolean
}

export default function CreateBoolean(props: Props): JSX.Element {
  const { schema, nullable, description } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <BooleanLabel />
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
