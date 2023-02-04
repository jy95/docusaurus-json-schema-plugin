import React from "react"

import {
  EnumQM,
  StringLengthQM,
  ObjectPropertiesQM,
  NoExtraPropertiesQM,
  ArrayNumberOfItemsQM,
  ArrayContainsNumberQM,
  NoExtraItemsQM,
  NumberBoundsQM,
  PatternQM,
  MultipleOfQM,
  ArrayUniqueItemsQM,
  DefaultValueQM,
  ConstantQM,
} from "./QualifierMessages/index"

import type { JSONSchema, JSONSchemaNS } from "../types"

type Props = {
  schema?: JSONSchema
}

// The heart of the plugin : Display human friendly messages
export default function QualifierMessages(props: Props): null | JSX.Element {
  const { schema } = props

  if (schema === undefined || typeof schema === "boolean") {
    return null
  }

  let result = [
    // For enum case
    schema?.enum !== undefined && <EnumQM schema={schema} />,
    // minLength / maxLength case
    (schema?.minLength !== undefined || schema?.maxLength !== undefined) && (
      <StringLengthQM schema={schema} />
    ),
    // minProperties / maxProperties
    (schema?.minProperties !== undefined ||
      schema?.maxProperties !== undefined) && (
      <ObjectPropertiesQM schema={schema} />
    ),
    // No extra properties in object
    schema?.additionalProperties === false && <NoExtraPropertiesQM />,
    // minItems / maxItems
    (schema?.minItems !== undefined || schema?.maxItems !== undefined) && (
      <ArrayNumberOfItemsQM schema={schema} />
    ),
    // minContains / maxContains
    ((schema as JSONSchemaNS.Array).minContains !== undefined ||
      (schema as JSONSchemaNS.Array).maxContains !== undefined) && (
      <ArrayContainsNumberQM schema={schema} />
    ),
    // No extra items in array
    (schema?.items === false || schema?.additionalItems === false) && (
      <NoExtraItemsQM />
    ),
    // minimum / exclusiveMinimum / maximum / exclusiveMaximum
    (schema?.minimum !== undefined ||
      schema?.exclusiveMinimum !== undefined ||
      schema?.maximum !== undefined ||
      schema?.exclusiveMaximum !== undefined) && (
      <NumberBoundsQM schema={schema} />
    ),
    // pattern
    schema?.pattern !== undefined && <PatternQM schema={schema} />,
    // multipleOf
    schema?.multipleOf !== undefined && <MultipleOfQM schema={schema} />,
    // uniqueItems
    schema?.uniqueItems !== undefined && schema.uniqueItems === true && (
      <ArrayUniqueItemsQM />
    ),
    // Default value
    schema?.default !== undefined && <DefaultValueQM schema={schema} />,
    // Const value
    schema?.const !== undefined && <ConstantQM schema={schema} />,
  ].filter((item) => item !== false) as JSX.Element[]

  if (result.length === 0) {
    return null
  } else {
    return <>{result}</>
  }
}
