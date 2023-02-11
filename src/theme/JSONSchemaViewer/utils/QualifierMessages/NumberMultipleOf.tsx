import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
}

// multipleOf
export default function MultipleOf(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  /* istanbul ignore if  */
  if (typeof schema === "boolean") {
    return null
  }

  return (
    <div key={"multipleOf"}>
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.multipleOf",
          }}
        >
          {"Possible values :"}
        </Translate>
      </strong>
      &nbsp;
      <code>
        <Translate
          values={{
            id: "json-schema.keywords.multipleOf",
            count: schema.multipleOf!,
          }}
        >
          {"multiple of {count}"}
        </Translate>
      </code>
    </div>
  )
}
