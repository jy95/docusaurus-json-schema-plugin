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
function AdditionalItemsLabel({ count }: { count: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.additionalItemsEntry",
          count: count,
        }}
      >
        {"items[{count},...]"}
      </Translate>
    </code>
  )
}

// To support that scenario not possible anymore in draft-2020-12
export default function CreateAdditionalItems(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  let items = schema.additionalItems

  // If undefined or boolean, print nothing
  if (items === undefined || typeof items === "boolean") {
    return <></>
  }

  // Because of "items", starting index isn't the same
  const startingIndex = Array.isArray(schema.items) ? schema.items.length : 1

  return (
    <ul>
      <SchemaHierarchyContextProvider
        value={{
          level: currentLevel + 1,
          jsonPointer: `${currentJsonPointer}/additionalItems`,
        }}
      >
        <CreateEdge
          key={`array_additionalItems`}
          name={<AdditionalItemsLabel count={startingIndex} />}
          schema={items}
          required={
            schema.minItems !== undefined &&
            startingIndex >= schema.minItems - 1
          }
        />
      </SchemaHierarchyContextProvider>
    </ul>
  )
}
