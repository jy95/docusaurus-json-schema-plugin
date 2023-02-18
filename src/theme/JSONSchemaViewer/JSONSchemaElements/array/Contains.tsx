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

  let item = schema.contains!

  const containsLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.contains",
        }}
      >
        {"contains"}
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
