import React from "react"

import Translate from "@docusaurus/Translate"

import { CreateValue } from "@theme/JSONSchemaViewer/JSONSchemaElements"
import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts"
import type { JSONSchema } from "@theme/JSONSchemaViewer/types"
import { printSchemaType } from "@theme/JSONSchemaViewer/utils/QualifierMessages"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

// For "enum" property
export default function EnumQualifierMessage(props: Props): JSX.Element {
  const { schema } = props
  const { ValueComponent } = useJSVOptionsContext()

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

  // check for a provided `ValueComponent` in viewerOptions for customized
  // rendering of individual enum values.
  //
  // NOTE: for backwards compatibility if `ValueComponent` is not specified,
  // this renders enumValues together in a single CodeBlock for the entire
  // `schema.enum` array.
  const enumValues = !ValueComponent
    ? printSchemaType(schema.enum!)
    : <ul>
        {schema.enum!.map((value, index) => <li key={index}>
          <CreateValue value={value} />
        </li>)}
      </ul>

  return (
    <div key={"enum"}>
      {enumLabel}&nbsp;
      {enumValues}
    </div>
  )
}
