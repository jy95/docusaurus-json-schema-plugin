import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"
import {
  SchemaHierarchyContextProvider,
  useSchemaHierarchyContext,
} from "@theme/JSONSchemaViewer/contexts"

import type { JSONSchema, JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
}

// Translated label
function PrefixItemsLabel({ count }: { count: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.prefixItemsEntry",
          count: count,
        }}
      >
        {"items[{count}]"}
      </Translate>
    </code>
  )
}

export default function CreatePrefixItems(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
  const { schema } = props

  let items = schema.prefixItems

  // If undefined, print nothing
  if (items === undefined) {
    return <></>
  }

  let isArray = Array.isArray(items)
  let minimal = Array.isArray(items) ? items.length : 1
  let array = (Array.isArray(items) ? items : [items]) as JSONSchema[]

  // prefixItems is an array in any case
  return (
    <ul>
      {array.map((val, idx) => {
        return (
          <SchemaHierarchyContextProvider
            key={`schema_hierarchy_${idx}`}
            value={{
              level: currentLevel + 1,
              jsonPointer: `${currentJsonPointer}/prefixItems${
                isArray ? `/${idx}` : ""
              }`,
            }}
          >
            <CreateEdge
              key={`array_prefixItems_${idx}`}
              name={<PrefixItemsLabel count={idx} />}
              schema={val}
              required={
                schema.minItems !== undefined && schema.minItems >= minimal
              }
            />
          </SchemaHierarchyContextProvider>
        )
      })}
    </ul>
  )
}
