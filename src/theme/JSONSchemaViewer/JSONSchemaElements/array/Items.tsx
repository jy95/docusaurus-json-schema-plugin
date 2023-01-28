import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  [x: string]: any
  schema: JSONSchema7
}

function createItems(props: Props): JSX.Element {
  const { schema } = props
  let items = schema.items!

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
        schema={items}
        required={schema?.minItems !== undefined && schema?.minItems > 0}
      />
    )
  }
}

export default createItems
