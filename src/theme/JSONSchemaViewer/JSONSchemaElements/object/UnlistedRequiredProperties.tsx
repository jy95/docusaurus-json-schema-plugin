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

// Generate properties listed as "required" but that couldn't be found in "properties", ...
export default function CreateUnlistedProperties(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  const required: readonly string[] = schema.required || []
  const listedProperties = Object.keys(schema.properties || {})

  // find out why properties are in fact "unlisted"
  const unlistedProperties = required.filter(
    (r) => !listedProperties.includes(r),
  )

  // If nothing (what SHOULD be the case in a clear spec), we don't display anything
  if (unlistedProperties.length === 0) {
    return <></>
  }

  // If something, adopt strategy similar to CreateProperties
  return (
    <ul>
      {unlistedProperties.map((prop, idx) => (
        <SchemaHierarchyContextProvider
          value={{
            level: currentLevel + 1,
            jsonPointer: `${currentJsonPointer}/properties/${encodeStringForJSONPointer(
              prop,
            )}`,
          }}
        >
          <CreateEdge
            key={`object_unlisted_properties_${idx}`}
            name={<strong>{prop}</strong>}
            schema={true}
            required={true}
          />
        </SchemaHierarchyContextProvider>
      ))}
    </ul>
  )
}
