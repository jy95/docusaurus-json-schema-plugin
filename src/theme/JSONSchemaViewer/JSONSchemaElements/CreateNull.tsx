import React from "react"

import { QualifierMessages } from "@theme/JSONSchemaViewer/utils/index"

import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts/index"

import { TypeLabel, NullLabel } from "@theme/JSONSchemaViewer/labels/index"

import { CreateDescription } from "@theme/JSONSchemaViewer/JSONSchemaElements/index"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Null
  description?: string
}

export default function CreateNull(props: Props): JSX.Element {
  const { schema, description } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <NullLabel />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages schema={schema} options={options} />
      </div>
      {description !== undefined && (
        <CreateDescription description={description} />
      )}
    </>
  )
}
