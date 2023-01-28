import React from "react"

import Translate from "@docusaurus/Translate"

import Items from "./Items"
import Contains from "./Contains"
import PrefixItems from "./PrefixItems"

import { QualifierMessages } from "../../utils/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

// TODO later handle prefixItems VS items properties

function createArray(props: Props): JSX.Element {
  const { schema } = props

  let typedSchema = schema as JSONSchemaNS.Array

  if (typeof typedSchema === "boolean") {
    return <></>
  }

  let items =
    typedSchema?.items !== undefined ? <Items schema={schema} /> : undefined
  let contains =
    typedSchema?.contains !== undefined ? (
      <Contains schema={schema} />
    ) : undefined
  let prefixItems =
    typedSchema?.prefixItems !== undefined ? (
      <PrefixItems schema={schema} />
    ) : undefined

  return (
    <>
      <strong>
        <Translate
          values={{
            id: "json-schema.keywords.type",
            count: 1,
          }}
        >
          {"type"}
        </Translate>
      </strong>
      &nbsp;&#58;&nbsp;
      <span style={{ opacity: "0.6" }}>
        <Translate
          values={{
            id: "json-schema.keywords.array",
          }}
        >
          {"array"}
        </Translate>
      </span>
      {items !== undefined && <ul>{items}</ul>}
      {prefixItems !== undefined && <ul>{prefixItems}</ul>}
      {contains !== undefined && <ul>{contains}</ul>}
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages schema={schema} />
      </div>
      {typedSchema?.description !== undefined && (
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {typedSchema.description}
        </div>
      )}
    </>
  )
}

export default createArray
