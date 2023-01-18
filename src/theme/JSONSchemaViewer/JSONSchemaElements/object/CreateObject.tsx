import React from "react"

import AdditionalProperties from "./AdditionalProperties"
import Properties from "./Properties"

import type { JSONSchema7 } from "json-schema"

type Props = {
  schema: JSONSchema7
  [x: string]: any
}

function createObject(props: Props): JSX.Element {
  const { schema } = props

  // TODO
  return <></>
}

export default createObject
