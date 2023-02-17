import React from "react"

import { QualifierMessages } from "../utils/index"

import { useJSVOptionsContext } from "../contexts/index"

import { TypeLabel, NullLabel } from "../labels/index"

import type { JSONSchemaNS } from "../types"

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
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {description}
        </div>
      )}
    </>
  )
}
