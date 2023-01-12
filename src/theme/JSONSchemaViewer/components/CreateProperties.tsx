import React from "react"

import { CreateEdges } from "./index"

import type { JSONSchema7 } from "json-schema"
import type { WithRequired } from "./index"

// Generate properties
function createProperties(
  schema: WithRequired<JSONSchema7, "properties">
): JSX.Element {
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
