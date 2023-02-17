import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
}

// Translated labels
function SingleItemLabel(): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.items",
        }}
      >
        {"items"}
      </Translate>
    </code>
  )
}

function MultipleItemsLabel({ count }: { count: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.itemsEntry",
          count: count,
        }}
      >
        {"items[{count}]"}
      </Translate>
    </code>
  )
}

export default function CreateItems(props: Props): JSX.Element {
  const { schema } = props

  let items = schema.items!

  if (Array.isArray(items)) {
    let minimal = items.length
    return (
      <>
        {items.map((val, idx) => {
          return (
            <CreateEdge
              key={`array_items_${idx}`}
              name={<MultipleItemsLabel count={idx} />}
              schema={val}
              required={
                schema.minItems !== undefined && schema.minItems >= minimal
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
        name={<SingleItemLabel />}
        schema={items}
        required={schema.minItems !== undefined && schema.minItems > 0}
      />
    )
  }
}
