import React from "react"

import { QualifierMessages } from "../utils/index"

import { useJSVOptionsContext } from "../contexts/index"

import { TypeLabel, BooleanLabel } from "../labels/index"

import { CreateDescription } from "./index"

import type { JSONSchemaNS } from "../types"

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
