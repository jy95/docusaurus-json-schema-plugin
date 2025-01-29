import React from "react"

import Translate from "@docusaurus/Translate"

import { printSchemaType } from "@theme/JSONSchemaViewer/utils/QualifierMessages"

import type { JSX } from "react"
import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

export default function ContentEncoding(props: Props): JSX.Element {
  const { schema } = props

  // Translated Labels
  const encodingLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.contentEncoding",
        }}
      >
        {"Encoding :"}
      </Translate>
    </strong>
  )

  return (
    <div key={"contentEncoding"}>
      {encodingLabel}
      &nbsp;
      {printSchemaType(schema.contentEncoding!)}
    </div>
  )
}
