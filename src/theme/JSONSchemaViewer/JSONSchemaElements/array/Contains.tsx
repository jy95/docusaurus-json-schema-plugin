import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

function createContains(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <></>
  }

  let item = schema.contains!

  return (
    <CreateEdge
      key={"contains"}
      name={
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.contains",
            }}
          >
            {"contains"}
          </Translate>
        </code>
      }
      schema={item}
      // @ts-ignore Check that later
      required={schema?.minContains !== undefined && schema.minContains > 0}
    />
  )
}

export default createContains
