import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"
import { SchemaHierarchyComponent } from "@theme/JSONSchemaViewer/contexts"

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
  const { schema } = props

  let items = schema.unevaluatedItems

  // If undefined or boolean, print nothing
  if (items === undefined || typeof items === "boolean") {
    return <></>
  }

  return (
    <ul>
      <SchemaHierarchyComponent innerJsonPointer={`/unevaluatedItems`}>
        <CreateEdge
          key={`array_unevaluatedItems`}
          name={<UnevaluatedItemsLabel />}
          schema={items}
          // By design, it isn't mandatory most of the time
          required={false}
        />
      </SchemaHierarchyComponent>
    </ul>
  )
}
