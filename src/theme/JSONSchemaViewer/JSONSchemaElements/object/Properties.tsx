import React from "react"

import { CreateEdge } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

// Generate properties
function createProperties(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <></>
  }

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
