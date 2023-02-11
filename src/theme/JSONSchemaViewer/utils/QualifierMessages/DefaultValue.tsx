import React from "react"

import Translate from "@docusaurus/Translate"

import { printSchemaType } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
}

// Default value
export default function DefaultValue(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  /* istanbul ignore if  */
  if (typeof schema === "boolean") {
    return null
  }

  // Translated Labels
  const defaultLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.default",
        }}
      >
        {"Default value :"}
      </Translate>
    </strong>
  )

  return (
    <div key={"default"}>
      {defaultLabel}
      &nbsp;
      {printSchemaType(schema.default!)}
    </div>
  )
}
