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
  schema: JSONSchema
}

// Zero, One or multiple conditions can match
function* conditionallyRenderQMs(
  schema: JSONSchema
): Generator<JSX.Element, void> {
  // Fast fail over
  if (schema === undefined || typeof schema === "boolean") {
    return undefined
  }

  // Enum
  if (schema?.enum !== undefined) {
    yield <EnumQM schema={schema} />
  }

  // minLength / maxLength
  if (schema?.minLength !== undefined || schema?.maxLength !== undefined) {
    yield <StringLengthQM schema={schema} />
  }

  // minProperties / maxProperties
  if (
    schema?.minProperties !== undefined ||
    schema?.maxProperties !== undefined
  ) {
    yield <ObjectPropertiesQM schema={schema} />
  }

  // No extra properties in object
  if (schema?.additionalProperties === false) {
    yield <NoExtraPropertiesQM />
  }

  // minItems / maxItems
  if (schema?.minItems !== undefined || schema?.maxItems !== undefined) {
    yield <ArrayNumberOfItemsQM schema={schema} />
  }

  // minContains / maxContains
  if (
    (schema as JSONSchemaNS.Array).minContains !== undefined ||
    (schema as JSONSchemaNS.Array).maxContains !== undefined
  ) {
    yield <ArrayContainsNumberQM schema={schema} />
  }

  // No extra items in array
  if (schema?.items === false || schema?.additionalItems === false) {
    yield <NoExtraItemsQM />
  }

  // minimum / exclusiveMinimum / maximum / exclusiveMaximum
  if (
    schema?.minimum !== undefined ||
    schema?.exclusiveMinimum !== undefined ||
    schema?.maximum !== undefined ||
    schema?.exclusiveMaximum !== undefined
  ) {
    yield <NumberBoundsQM schema={schema} />
  }

  // pattern
  if (schema?.pattern !== undefined) {
    yield <PatternQM schema={schema} />
  }

  // multipleOf
  if (schema?.multipleOf !== undefined) {
    yield <MultipleOfQM schema={schema} />
  }

  // uniqueItems
  if (schema?.uniqueItems !== undefined && schema.uniqueItems === true) {
    yield <ArrayUniqueItemsQM />
  }

  // Default value
  if (schema?.default !== undefined) {
    yield <DefaultValueQM schema={schema} />
  }

  // Const value
  if (schema?.const !== undefined) {
    yield <ConstantQM schema={schema} />
  }
}

// The heart of the plugin : Display human friendly messages
export default function QualifierMessages(props: Props): null | JSX.Element {
  const { schema } = props

  // Find out which messages will be triggered
  let result = Array.from(conditionallyRenderQMs(schema))

  if (result.length === 0) {
    return null
  } else {
    return <>{result}</>
  }
}
