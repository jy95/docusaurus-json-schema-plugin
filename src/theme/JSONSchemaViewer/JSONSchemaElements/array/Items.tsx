import React from "react"

import { CreateNodes } from "../../components/index"

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
            <CreateEdges
              name={key}
              schema={val}
              required={
                typeof val !== "boolean" && Array.isArray(val?.required)
                  ? val.required.includes(key)
                  : false
              }
              key={key}
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
