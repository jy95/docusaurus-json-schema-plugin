import React from "react"

import Translate from "@docusaurus/Translate"

import { CreateValue } from "@theme/JSONSchemaViewer/JSONSchemaElements"
import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

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
      <ul>
        {schema.enum!.map((value, index) => <li key={index}>
          <CreateValue value={value} schema={schema} />
        </li>)}
      </ul>
    </div>
  )
}
