import React from "react"

import Translate from "@docusaurus/Translate"

import Items from "./Items"
import Contains from "./Contains"

import { QualifierMessages } from "../../utils/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  schema: JSONSchema7
  [x: string]: any
}

// TODO later handle prefixItems VS items properties

function createArray(props: Props): JSX.Element {
  const { schema } = props

  let items =
    schema?.items !== undefined ? <Items schema={schema} /> : undefined
  let contains =
    schema?.contains !== undefined ? <Contains schema={schema} /> : undefined

  // TODO
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
      {contains !== undefined && { contains }}
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages schema={schema} />
      </div>
      {schema?.description !== undefined && (
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          {schema.description}
        </div>
      )}
    </>
  )
}

export default createArray
