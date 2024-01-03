import React from "react"

import { CreateNodes } from "@theme/JSONSchemaViewer/components"
import { SchemaHierarchyComponent } from "@theme/JSONSchemaViewer/contexts"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

export default function NotSchema(props: Props): JSX.Element {
  const { schema } = props

  let typedSchema = schema.not!
  let typeOf = "not"

  return (
    <div>
      <span className="badge badge--danger">{typeOf}</span>
      <br />
      <SchemaHierarchyComponent innerJsonPointer="/not">
        <CreateNodes schema={typedSchema} />
      </SchemaHierarchyComponent>
    </div>
  )
}
