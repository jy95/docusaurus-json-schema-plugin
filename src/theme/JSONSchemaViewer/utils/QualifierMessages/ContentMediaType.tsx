import React from "react"

import Translate from "@docusaurus/Translate"

import { printSchemaType } from "@theme/JSONSchemaViewer/utils/QualifierMessages"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

export default function ContentMediaType(props: Props): JSX.Element {
  const { schema } = props

  // Translated Labels
  const mediaTypeLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.contentMediaType",
        }}
      >
        {"Media type :"}
      </Translate>
    </strong>
  )

  return (
    <div key={"contentMediaType"}>
      {mediaTypeLabel}
      &nbsp;
      {printSchemaType(schema.contentMediaType!)}
    </div>
  )
}
