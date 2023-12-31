import React from "react"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"
import {
  SchemaHierarchyContextProvider,
  useSchemaHierarchyContext,
} from "@theme/JSONSchemaViewer/contexts"
import { encodeStringForJSONPointer } from "@theme/JSONSchemaViewer/utils"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate properties
export default function CreatePatternProperties(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  const patternProperties = schema.patternProperties

  // If it doesn't exist, print nothing
  if (patternProperties === undefined) {
    return <></>
  }

  return (
    <ul>
      {Object.entries(patternProperties).map(([key, value]) => (
        <SchemaHierarchyContextProvider
          key={`object_patternProperties_${key}`}
          value={{
            level: currentLevel + 1,
            jsonPointer: `${currentJsonPointer}/patternProperties/${encodeStringForJSONPointer(
              key,
            )}`,
          }}
        >
          <CreateEdge
            name={<code>{key}</code>}
            schema={value}
            required={false}
          />
        </SchemaHierarchyContextProvider>
      ))}
    </ul>
  )
}
