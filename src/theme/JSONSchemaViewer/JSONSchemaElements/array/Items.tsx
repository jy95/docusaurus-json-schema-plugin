import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

function createItems(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean" || typeof schema?.items === "boolean") {
    return <></>
  }

  let items = schema.items!

  // Unlikely but fail first
  if (typeof items === "boolean") {
    return <></>
  }

  if (Array.isArray(items)) {
    let minimal = items.length
    return (
      <>
        {Object.entries(items).map(([key, val]) => {
          return (
            <CreateEdge
              key={`array_items_${key}`}
              name={
                <code>
                  <Translate
                    values={{
                      id: "json-schema.keywords.itemsEntry",
                      count: key,
                    }}
                  >
                    {"items[{count}]"}
                  </Translate>
                </code>
              }
              schema={val}
              required={
                schema?.minItems !== undefined && schema?.minItems >= minimal
              }
            />
          )
        })}
      </>
    )
  } else {
    // singe items (most common case)
    let typedItem = items as JSONSchema

    return (
      <CreateEdge
        key={"array_items"}
        name={
          <code>
            <Translate
              values={{
                id: "json-schema.keywords.items",
              }}
            >
              {"items"}
            </Translate>
          </code>
        }
        schema={typedItem}
        required={schema?.minItems !== undefined && schema?.minItems > 0}
      />
    )
  }
}

export default createItems
