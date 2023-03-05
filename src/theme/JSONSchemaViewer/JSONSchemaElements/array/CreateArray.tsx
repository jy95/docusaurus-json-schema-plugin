import React from "react"

import Items from "./Items"
import Contains from "./Contains"
import PrefixItems from "./PrefixItems"
import AdditionalItems from "./AdditionalItems"
import UnevaluatedItems from "./UnevaluatedItems"

import { QualifierMessages } from "../../utils/index"

import { useJSVOptionsContext } from "../../contexts/index"

import { ArrayLabel, TypeLabel } from "../../labels/index"

import { CreateDescription } from "../index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.Array
  nullable?: boolean
  description?: string
  [x: string]: any
}

export default function CreateArray(props: Props): JSX.Element {
  const { schema, nullable, description } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <ArrayLabel />
      <PrefixItems schema={schema} />
      <Items schema={schema} />
      <AdditionalItems schema={schema} />
      <UnevaluatedItems schema={schema} />
      <Contains schema={schema} />
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
