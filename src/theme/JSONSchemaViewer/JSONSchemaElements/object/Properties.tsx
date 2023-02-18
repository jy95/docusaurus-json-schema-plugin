import React from "react"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate properties
export default function CreateProperties(props: Props): JSX.Element {
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
