import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"
import {
  SchemaHierarchyContextProvider,
  useSchemaHierarchyContext,
} from "@theme/JSONSchemaViewer/contexts/schemaHierarchy"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
}

// Translated label
function UnevaluatedItemsLabel(): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.unevaluatedItemsEntry",
        }}
      >
        {"items[y]"}
      </Translate>
    </code>
  )
}

// To support unevaluatedItems scenario
export default function CreateUnevaluatedItems(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  let items = schema.unevaluatedItems

  // If undefined or boolean, print nothing
  if (items === undefined || typeof items === "boolean") {
    return <></>
  }

  return (
    <ul>
      <SchemaHierarchyContextProvider
        value={{
          level: currentLevel + 1,
          jsonPointer: `${currentJsonPointer}/unevaluatedItems`,
        }}
      >
        <CreateEdge
          key={`array_unevaluatedItems`}
          name={<UnevaluatedItemsLabel />}
          schema={items}
          // By design, it isn't mandatory most of the time
          required={false}
        />
      </SchemaHierarchyContextProvider>
    </ul>
  )
}
