import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  [x: string]: any
  schema: JSONSchema7 & {
    // Draft 2019-09 attributes
    minContains?: number
    maxContains?: number
  }
}

function createContains(props: Props): JSX.Element {
  const { schema } = props
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
      required={schema?.minContains !== undefined && schema.minContains > 0}
    />
  )
}

export default createContains
