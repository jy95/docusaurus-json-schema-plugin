import React from "react"

import { QualifierMessages } from "../utils/index"

import { useJSVOptionsContext } from "../contexts/index"

import { TypeLabel, NumberLabel } from "../labels/index"

import type { JSONSchema } from "../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

export default function CreateNumber(props: Props): JSX.Element {
  const { schema } = props
  const options = useJSVOptionsContext()
  const description =
    typeof schema !== "boolean" ? schema.description : undefined

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <NumberLabel />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages schema={schema} options={options} />
      </div>
      {description !== undefined && (
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {description}
        </div>
      )}
    </>
  )
}
