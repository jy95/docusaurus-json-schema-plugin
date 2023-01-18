import React from "react"

import { CreateEdges } from "../../components/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  schema: JSONSchema7
  [x: string]: any
}

// Generate properties
function createProperties(props: Props): JSX.Element {
  const { schema } = props

  return (
    <>
      {Object.entries(schema.properties!).map(([key, value]) => {
        return CreateEdges({
          name: key,
          schema: value,
        })
      })}
    </>
  )
}

export default createProperties
