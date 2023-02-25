import React from "react"

import CodeBlock from "@theme-original/CodeBlock"

// To print all JSONS / value / string
export function printSchemaType(obj: unknown): JSX.Element {
  // deal with simple types first
  if (["string", "number", "bigint", "boolean"].includes(typeof obj)) {
    return <code>{(obj as string | number | bigint | boolean).toString()}</code>
  }

  // if it is a object / array, it is likely to be complex so time for my ace card
  return <CodeBlock language="json">{`${JSON.stringify(obj)}`}</CodeBlock>
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
export { default as DeprecatedQM } from "./Deprecated"
export { default as ReadOnlyQM } from "./ReadOnly"
export { default as WriteOnlyQM } from "./WriteOnly"
export { default as NullableQM } from "./Nullable"
export { default as ContentMediaTypeQM } from "./ContentMediaType"
export { default as ContentEncodingQM } from "./ContentEncoding"
export { default as ContentSchemaQM } from "./ContentSchema"
export {
  CHECKS_MAP as QUALIFIERS_MAP,
  DEFAULT_ORDER as QUALIFIERS_DEFAULT_ORDER,
} from "./QualifierMessagesMap"

export type { CheckKey } from "./QualifierMessagesMap"
