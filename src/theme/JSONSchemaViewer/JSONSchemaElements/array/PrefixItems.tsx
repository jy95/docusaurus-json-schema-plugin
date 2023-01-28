import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

function createPrefixItems(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <></>
  }

  // @ts-ignore Check that later
  let items = schema.prefixItems! as JSONSchema[]
  let minimal = items.length

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
              schema?.minItems !== undefined && schema?.minItems >= minimal
            }
          />
        )
      })}
    </>
  )
}

export default createPrefixItems
