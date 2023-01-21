import React from "react"

import { CreateNodes } from "../../components/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  [x: string]: any
  schema: JSONSchema7
}

function createContains(props: Props): JSX.Element {
  const { schema } = props
  let item = schema.contains!

  // singe items (most common case)
  // TODO or CreateEdges
  return <CreateNodes schema={item} />
}

export default createContains
