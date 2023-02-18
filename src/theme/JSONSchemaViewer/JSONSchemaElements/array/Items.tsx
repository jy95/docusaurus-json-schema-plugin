import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
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

  let items = schema.items

  // If undefined or boolean, print nothing
  if (items === undefined) {
    return <></>
  }

  // Because of "prefixItems", starting index isn't the same
  const startingIndex = Array.isArray(schema.prefixItems)
    ? schema.prefixItems.length
    : 0

  // Generify that part
  const itemsAsArray = Array.isArray(items) ? items : [items]
  const minimal = itemsAsArray.length

  return (
    <ul>
      {itemsAsArray.map((item, idx) => (
        <CreateEdge
          key={`array_items_${idx}`}
          name={<MultipleItemsLabel count={startingIndex + idx} />}
          schema={item}
          required={schema.minItems !== undefined && schema.minItems >= minimal}
        />
      ))}
    </ul>
  )
}
