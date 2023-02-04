import React from "react"

import Translate from "@docusaurus/Translate"

import { printSchemaType } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
}

export default function Constant(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  if (typeof schema === "boolean") {
    return null
  }

  return (
    <div key={"const"}>
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.const",
          }}
        >
          {"Constant value :"}
        </Translate>
      </strong>
      &nbsp;
      {printSchemaType(schema?.const)}
    </div>
  )
}
