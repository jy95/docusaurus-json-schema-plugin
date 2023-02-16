import React from "react"

import { QualifierMessages } from "../utils/index"

import { useJSVOptionsContext } from "../contexts/index"

import { TypeLabel, IntegerLabel } from "../labels/index"

import type { JSONSchema } from "../types"

type Props = {
  [x: string]: any
  nullable?: boolean
  schema: JSONSchema
}

export default function CreateInteger(props: Props): JSX.Element {
  const { schema, nullable } = props
  const options = useJSVOptionsContext()
  const description =
    typeof schema !== "boolean" ? schema.description : undefined

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
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {description}
        </div>
      )}
    </>
  )
}
