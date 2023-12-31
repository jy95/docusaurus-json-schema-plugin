import React from "react"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"
import {
  SchemaHierarchyContextProvider,
  useSchemaHierarchyContext,
} from "@theme/JSONSchemaViewer/contexts/schemaHierarchy"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Generate propertyNames
export default function PropertyNames(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  let propertyNames = schema.propertyNames

  // Fast Fail over
  if (
    propertyNames === undefined ||
    typeof propertyNames === "boolean" ||
    propertyNames.pattern === undefined
  ) {
    return <></>
  }

  // As propertyNames doesn't care about type below, we can remove "pattern" for next calls
  // So we are not misguided to consider it as string
  let pattern = propertyNames.pattern
  let newSchema = { ...propertyNames }
  delete newSchema.pattern

  return (
    <ul>
      <SchemaHierarchyContextProvider
        value={{
          level: currentLevel + 1,
          jsonPointer: `${currentJsonPointer}/propertyNames`,
        }}
      >
        <CreateEdge
          key={"propertyNames"}
          name={<code>{pattern}</code>}
          schema={newSchema}
          required={false}
        />
      </SchemaHierarchyContextProvider>
    </ul>
  )
}
