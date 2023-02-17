import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"
import { printSchemaType } from "./index"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

// For "enum" property
export default function EnumQualifierMessage(props: Props): JSX.Element {
  const { schema } = props

  const enumLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.enum",
        }}
      >
        {"Possible values :"}
      </Translate>
    </strong>
  )

  return (
    <div key={"enum"}>
      {enumLabel}&nbsp;
      {printSchemaType(schema.enum!)}
    </div>
  )
}
