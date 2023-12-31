import React from "react"

import { CreateNodes } from "@theme/JSONSchemaViewer/components"
import {
  SchemaHierarchyContextProvider,
  useSchemaHierarchyContext,
} from "@theme/JSONSchemaViewer/contexts"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

export default function NotSchema(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  let typedSchema = schema.not!
  let typeOf = "not"

  return (
    <div>
      <span className="badge badge--danger">{typeOf}</span>
      <br />
      <SchemaHierarchyContextProvider
        value={{
          level: currentLevel + 1,
          jsonPointer: `${currentJsonPointer}/not`,
        }}
      >
        <CreateNodes schema={typedSchema} />
      </SchemaHierarchyContextProvider>
    </div>
  )
}
