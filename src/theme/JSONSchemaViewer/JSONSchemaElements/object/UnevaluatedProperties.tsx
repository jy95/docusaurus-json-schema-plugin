import React from "react"
import Translate from "@docusaurus/Translate"

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

// Translated label
function UnevaluatedPropertiesLabel(): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.labels.unevaluatedProperties",
        }}
      >
        {"property name*"}
      </Translate>
    </code>
  )
}

export default function CreateUnevaluatedProperties(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  let unevaluatedProperties = schema.unevaluatedProperties

  // We don't have to care about that as it will be covered by QualifierMessages
  if (
    unevaluatedProperties === undefined ||
    typeof unevaluatedProperties === "boolean"
  ) {
    return <></>
  }

  return (
    <ul>
      <SchemaHierarchyContextProvider
        value={{
          level: currentLevel + 1,
          jsonPointer: `${currentJsonPointer}/unevaluatedProperties`,
        }}
      >
        <CreateEdge
          key={"object_unevaluatedProperties"}
          name={<UnevaluatedPropertiesLabel />}
          schema={unevaluatedProperties}
          required={false}
        />
      </SchemaHierarchyContextProvider>
    </ul>
  )
}
