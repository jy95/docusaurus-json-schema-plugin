import React from "react"

import { CreateNodes, CreateEdge } from "../../components/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  [x: string]: any
  schema: JSONSchema7
}

function createItems(props: Props): JSX.Element {
  const { schema } = props
  let items = schema.items!

  if (Array.isArray(items)) {
    return (
      <>
        {Object.entries(items).map(([key, val]) => {
          return (
            <CreateEdge
              key={`array_items_${key}`}
              name={key}
              schema={val}
              required={
                Array.isArray(schema.required)
                  ? schema.required.includes(key)
                  : false
              }
            />
          )
        })}
      </>
    )
  } else {
    // singe items (most common case)
    // TODO or CreateEdges
    return <CreateNodes schema={items} />
  }
}

export default createItems
