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
export { default as EnumQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/Enum"
export { default as StringLengthQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/StringLength"
export { default as ObjectPropertiesQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ObjectProperties"
export { default as NoExtraPropertiesQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/NoExtraProperties"
export { default as ArrayNumberOfItemsQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ArrayNumberOfItems"
export { default as ArrayContainsNumberQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ArrayContainsNumber"
export { default as NoExtraItemsQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/NoExtraItems"
export { default as NumberBoundsQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/NumberBounds"
export { default as PatternQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/Pattern"
export { default as MultipleOfQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/NumberMultipleOf"
export { default as ArrayUniqueItemsQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ArrayUniqueItems"
export { default as DefaultValueQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/DefaultValue"
export { default as ConstantQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/Constant"
export { default as ExamplesQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/Examples"
export { default as DeprecatedQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/Deprecated"
export { default as ReadOnlyQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ReadOnly"
export { default as WriteOnlyQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/WriteOnly"
export { default as NullableQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/Nullable"
export { default as ContentMediaTypeQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ContentMediaType"
export { default as ContentEncodingQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ContentEncoding"
export { default as ContentSchemaQM } from "@theme/JSONSchemaViewer/utils/QualifierMessages/ContentSchema"
export {
  CHECKS_MAP as QUALIFIERS_MAP,
  DEFAULT_ORDER as QUALIFIERS_DEFAULT_ORDER,
} from "@theme/JSONSchemaViewer/utils/QualifierMessages/QualifierMessagesMap"

export type { CheckKey } from "@theme/JSONSchemaViewer/utils/QualifierMessages/QualifierMessagesMap"
