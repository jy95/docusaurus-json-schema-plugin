import React from "react"

import { CreateEdges } from "../../components/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  schema: JSONSchema7
  [x: string]: any
}

// Generate properties
function createPatternProperties(props: Props): JSX.Element {
  const { schema } = props

  return (
    <>
      {Object.entries(schema.patternProperties!).map(([key, value]) => {
        return CreateEdges({
          name: key,
          schema: value,
          required: Array.isArray(schema.required)
            ? schema.required.includes(key)
            : false,
        })
      })}
    </>
  )
}

export default createPatternProperties
