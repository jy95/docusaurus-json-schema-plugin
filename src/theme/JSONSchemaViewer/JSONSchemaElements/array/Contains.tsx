import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

function createContains(props: Props): JSX.Element {
  const { schema } = props

  let typedSchema = schema as JSONSchemaNS.Array

  if (typeof typedSchema === "boolean") {
    return <></>
  }

  let item = typedSchema.contains!

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
      required={
        typedSchema?.minContains !== undefined && typedSchema.minContains > 0
      }
    />
  )
}

export default createContains
