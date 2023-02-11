import React from "react"

import Translate from "@docusaurus/Translate"
// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import type { JSONSchema } from "../../types"
import { printSchemaType } from "./index"

type Props = {
  schema?: JSONSchema
}

// For "examples" property
export default function ExamplesQualifierMessage(
  props: Props
): null | JSX.Element {
  const { schema } = props

  // fast fail
  /* istanbul ignore if  */
  if (typeof schema === "boolean") {
    return null
  }

  const examplesLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.examples",
        }}
      >
        {"Possible values :"}
      </Translate>
    </strong>
  )

  let items = schema?.examples!.map((val, idx) => ({
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
            {printSchemaType(item.value)}
          </TabItem>
        ))}
      </Tabs>
    </div>
  )
}
