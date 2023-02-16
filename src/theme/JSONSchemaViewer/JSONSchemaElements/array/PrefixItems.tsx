import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
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
  const { schema } = props

  let typedSchema = schema as JSONSchemaNS.Array

  /* istanbul ignore if  */
  if (typeof typedSchema === "boolean") {
    return <></>
  }

  let items = typedSchema.prefixItems!
  let minimal = Array.isArray(items) ? items.length : 1
  let array = (Array.isArray(items) ? items : [items]) as JSONSchema[]

  // prefixItems is an array in any case
  return (
    <>
      {array.map((val, idx) => {
        return (
          <CreateEdge
            key={`array_prefixItems_${idx}`}
            name={<PrefixItemsLabel count={idx} />}
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
}
