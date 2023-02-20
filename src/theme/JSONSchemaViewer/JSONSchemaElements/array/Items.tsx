import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
}

function ItemsLabel({
  index,
  isArray,
}: {
  index: number
  isArray: boolean
}): JSX.Element {
  // When items is not an array, we have to use a generic index
  let finalIdx = isArray ? index : "x"

  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.itemsEntry",
          index: finalIdx,
        }}
      >
        {"items[{index}]"}
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
  const isArray = Array.isArray(items)
  const itemsAsArray = Array.isArray(items) ? items : [items]
  const minimal = itemsAsArray.length

  return (
    <ul>
      {itemsAsArray.map((item, idx) => (
        <CreateEdge
          key={`array_items_${idx}`}
          name={<ItemsLabel index={startingIndex + idx} isArray={isArray} />}
          schema={item}
          required={schema.minItems !== undefined && schema.minItems >= minimal}
        />
      ))}
    </ul>
  )
}
