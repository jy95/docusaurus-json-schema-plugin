import React from "react"

import { CreateEdges } from "./index"

import type { JSONSchema7 } from "json-schema"
import type { WithRequired } from "./index"

type Props = {
  schema: WithRequired<JSONSchema7, "properties">
  [x: string]: any
}

// Generate properties
function createProperties(props: Props): JSX.Element {
  const { schema } = props

  return (
    <>
      {Object.entries(schema.properties).map(([key, value]) => {
        return CreateEdges({
          name: key,
          schema: value,
          required: Array.isArray(schema?.required)
            ? schema.required.includes(key)
            : false,
        })
      })}
    </>
  )
}

export default createProperties
