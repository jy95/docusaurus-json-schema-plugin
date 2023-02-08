import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
}

// pattern
export default function Pattern(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  /* istanbul ignore if  */
  if (typeof schema === "boolean") {
    return null
  }

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
      <code>{schema?.pattern}</code>
    </div>
  )
}
