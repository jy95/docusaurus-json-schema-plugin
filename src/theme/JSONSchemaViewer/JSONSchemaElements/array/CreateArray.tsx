import React from "react"

import Items from "./Items"
import Contains from "./Contains"
import PrefixItems from "./PrefixItems"

import { QualifierMessages } from "../../utils/index"

import { useJSVOptionsContext } from "../../contexts/index"

import { ArrayLabel, TypeLabel } from "../../labels/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchema
  nullable?: boolean
  description?: string
  [x: string]: any
}

// TODO later handle prefixItems VS items properties

export default function CreateArray(props: Props): JSX.Element {
  const { schema, nullable, description } = props
  const options = useJSVOptionsContext()

  let typedSchema = schema as JSONSchemaNS.Array

  /* istanbul ignore if  */
  if (typeof typedSchema === "boolean") {
    return <></>
  }

  let items =
    typedSchema.items !== undefined ? <Items schema={schema} /> : undefined
  let contains =
    typedSchema.contains !== undefined ? (
      <Contains schema={schema} />
    ) : undefined
  let prefixItems =
    typedSchema.prefixItems !== undefined ? (
      <PrefixItems schema={schema} />
    ) : undefined

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <ArrayLabel />
      {items !== undefined && <ul>{items}</ul>}
      {prefixItems !== undefined && <ul>{prefixItems}</ul>}
      {contains !== undefined && <ul>{contains}</ul>}
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
