import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
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

  let typedSchema = schema as JSONSchemaNS.Array

  if (
    typeof typedSchema === "boolean" ||
    typeof typedSchema.items === "boolean"
  ) {
    return <></>
  }

  let items = typedSchema.items!

  // Unlikely but fail first
  if (typeof items === "boolean") {
    return <></>
  }

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
                typedSchema.minItems !== undefined &&
                typedSchema.minItems >= minimal
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
        name={<SingleItemLabel />}
        schema={typedItem}
        required={
          typedSchema.minItems !== undefined && typedSchema.minItems > 0
        }
      />
    )
  }
}
