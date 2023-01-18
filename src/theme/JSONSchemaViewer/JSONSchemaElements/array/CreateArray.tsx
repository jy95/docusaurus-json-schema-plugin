import React from "react"

import Items from "./Items"
import Contains from "./Contains"

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
      {items !== undefined && <ul>{items}</ul>}
      {contains !== undefined && { contains }}
    </>
  )
}

export default createArray
