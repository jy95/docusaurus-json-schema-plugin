import React from "react"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"
import {
  SchemaHierarchyContextProvider,
  useSchemaHierarchyContext,
} from "@theme/JSONSchemaViewer/contexts"
import { encodeStringForJSONPointer } from "@theme/JSONSchemaViewer/utils/index"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate properties
export default function CreateProperties(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
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
          <SchemaHierarchyContextProvider
            value={{
              level: currentLevel + 1,
              jsonPointer: `${currentJsonPointer}/properties/${encodeStringForJSONPointer(
                key,
              )}`,
            }}
          >
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
          </SchemaHierarchyContextProvider>
        )
      })}
    </ul>
  )
}
