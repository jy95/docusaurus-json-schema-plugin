import React from "react"

import Translate from "@docusaurus/Translate"

import { printSchemaType } from "@theme/JSONSchemaViewer/utils/QualifierMessages/index"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

export default function Constant(props: Props): JSX.Element {
  const { schema } = props

  // Translated Labels
  const constantLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.const",
        }}
      >
        {"Constant value :"}
      </Translate>
    </strong>
  )

  return (
    <div key={"const"}>
      {constantLabel}
      &nbsp;
      {printSchemaType(schema.const!)}
    </div>
  )
}
