import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchemaNS.Array
}

function createContains(props: Props): JSX.Element {
  const { schema } = props

  let item = schema.contains

  if (item === undefined) {
    return <></>
  }

  const containsLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.containsEntry",
        }}
      >
        {"items[..., x, ...]"}
      </Translate>
    </code>
  )

  return (
    <CreateEdge
      key={"contains"}
      name={containsLabel}
      schema={item}
      required={schema.minContains !== undefined && schema.minContains > 0}
    />
  )
}

export default createContains
