import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

function createPrefixItems(props: Props): JSX.Element {
  const { schema } = props

  let typedSchema = schema as JSONSchemaNS.Array

  if (typeof typedSchema === "boolean") {
    return <></>
  }

  let items = typedSchema.prefixItems!
  let minimal = Array.isArray(items) ? items.length : 1

  // prefixItems is an array in any case
  return (
    <>
      {Object.entries(items).map(([key, val]) => {
        return (
          <CreateEdge
            key={`array_prefixItems_${key}`}
            name={
              <code>
                <Translate
                  values={{
                    id: "json-schema.keywords.prefixItemsEntry",
                    count: key,
                  }}
                >
                  {"items[{count}]"}
                </Translate>
              </code>
            }
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

export default createPrefixItems
