import React from "react"

import Translate from "@docusaurus/Translate"
import CodeBlock from "@theme-original/CodeBlock"

// To print all JSONS
export function printSchemaType(obj: unknown): JSX.Element {
  // deal with simple types first
  if (["string", "number", "bigint", "boolean"].includes(typeof obj)) {
    return <code>{obj}</code>
  }

  // if it is a object / array, it is likely to be complex so time for my ace card
  return <CodeBlock language="json">{`${JSON.stringify(obj)}`}</CodeBlock>
}

// And label (commonly used in multiple situation)
export function AndLabel(): JSX.Element {
  return (
    <>
      &nbsp;
      <Translate
        values={{
          id: "json-schema.labels.and",
        }}
      >
        {"AND"}
      </Translate>
      &nbsp;
    </>
  )
}

// Inner functions
export { default as EnumQM } from "./Enum"
export { default as StringLengthQM } from "./StringLength"
export { default as ObjectPropertiesQM } from "./ObjectProperties"
export { default as NoExtraPropertiesQM } from "./NoExtraProperties"
export { default as ArrayNumberOfItemsQM } from "./ArrayNumberOfItems"
export { default as ArrayContainsNumberQM } from "./ArrayContainsNumber"
export { default as NoExtraItemsQM } from "./NoExtraItems"
export { default as NumberBoundsQM } from "./NumberBounds"
export { default as PatternQM } from "./Pattern"
export { default as MultipleOfQM } from "./NumberMultipleOf"
export { default as ArrayUniqueItemsQM } from "./ArrayUniqueItems"
export { default as DefaultValueQM } from "./DefaultValue"
export { default as ConstantQM } from "./Constant"
export { default as ExamplesQM } from "./Examples"
