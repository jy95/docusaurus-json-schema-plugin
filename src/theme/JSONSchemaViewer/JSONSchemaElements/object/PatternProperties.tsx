import React from "react"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate properties
export default function CreatePatternProperties(props: Props): JSX.Element {
  const { schema } = props

  return (
    <>
      {Object.entries(schema.patternProperties!).map(([key, value]) => {
        return (
          <CreateEdge
            key={`object_patternProperties_${key}`}
            name={<code>{key}</code>}
            schema={value}
            required={false}
          />
        )
      })}
    </>
  )
}
