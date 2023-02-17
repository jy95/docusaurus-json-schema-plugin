import React from "react"

import Translate from "@docusaurus/Translate"

import { printSchemaType } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

// Default value
export default function DefaultValue(props: Props): JSX.Element {
  const { schema } = props

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
