import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"
import { printSchemaType } from "./index"

type Props = {
  schema?: JSONSchema
}

// For "enum" property
export default function EnumQualifierMessage(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  if (typeof schema === "boolean") {
    return null
  }

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
      {printSchemaType(schema?.enum!)}
    </div>
  )
}
