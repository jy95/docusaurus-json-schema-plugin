import React from "react"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate properties
export default function CreatePatternProperties(props: Props): JSX.Element {
  const { schema } = props

  const patternProperties = schema.patternProperties

  // If it doesn't exist, print nothing
  if (patternProperties === undefined) {
    return <></>
  }

  return (
    <ul>
      {Object.entries(patternProperties).map(([key, value]) => (
        <CreateEdge
          key={`object_patternProperties_${key}`}
          name={<code>{key}</code>}
          schema={value}
          required={false}
        />
      ))}
    </ul>
  )
}
