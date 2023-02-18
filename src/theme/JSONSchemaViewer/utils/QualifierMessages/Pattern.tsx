import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

// pattern
export default function Pattern(props: Props): JSX.Element {
  const { schema } = props

  return (
    <div key={"pattern"}>
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.pattern",
          }}
        >
          {"Pattern :"}
        </Translate>
      </strong>
      &nbsp;
      <code>{schema.pattern!}</code>
    </div>
  )
}
