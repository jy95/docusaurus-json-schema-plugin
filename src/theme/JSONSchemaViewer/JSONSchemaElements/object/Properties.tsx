import React from "react"

import { CreateEdge } from "../../components/index"

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
        return (
          <CreateEdge
            key={`object_properties_${key}`}
            name={<strong>{key}</strong>}
            schema={value}
            required={
              Array.isArray(schema.required)
                ? schema.required.includes(key)
                : false
            }
          />
        )
      })}
    </>
  )
}

export default createProperties
