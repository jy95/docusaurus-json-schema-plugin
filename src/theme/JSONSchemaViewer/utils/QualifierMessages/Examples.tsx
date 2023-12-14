import React from "react"

import Translate from "@docusaurus/Translate"
// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { printSchemaType } from "@theme/JSONSchemaViewer/utils/QualifierMessages"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>,
  multiline?: boolean;
}

// For "examples" property
export default function ExamplesQualifierMessage(props: Props): JSX.Element {
  const { schema, multiline = false} = props

  const examplesLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.examples",
        }}
      >
        {"Example values :"}
      </Translate>
    </strong>
  )

  let items = schema.examples!.map((val, idx) => ({
    id: idx,
    value: val,
    label: (
      <Translate
        values={{
          id: "json-schema.labels.exampleItem",
          index: idx,
        }}
      >
        {"Example {index}"}
      </Translate>
    ),
  }))!

  return (
    <div key={"examples"}>
      {examplesLabel}&nbsp;
      <Tabs>
        {items.map((item) => (
          <TabItem key={item.id} value={item.id.toString()} label={item.label}>
            {printSchemaType(item.value, { multiline })}
          </TabItem>
        ))}
      </Tabs>
    </div>
  )
}
