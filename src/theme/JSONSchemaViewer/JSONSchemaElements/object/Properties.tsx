import React from "react"

import { CreateEdge } from "@theme/JSONSchemaViewer/components/index"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate properties
export default function CreateProperties(props: Props): JSX.Element {
  const { schema } = props

  const properties = schema.properties

  // If it doesn't exist, print nothing
  if (properties === undefined) {
    return <></>
  }

  return (
    <ul>
      {Object.entries(properties).map(([key, value]) => {
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
    </ul>
  )
}
