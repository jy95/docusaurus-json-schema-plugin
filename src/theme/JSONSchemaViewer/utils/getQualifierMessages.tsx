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
  if (schema.enum !== undefined) {
    yield <EnumQM key={"enum"} schema={schema} />
  }

  // minLength / maxLength
  if (schema.minLength !== undefined || schema.maxLength !== undefined) {
    yield <StringLengthQM key={"stringLength"} schema={schema} />
  }

  // minProperties / maxProperties
  if (
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined
  ) {
    yield <ObjectPropertiesQM key={"objectProperties"} schema={schema} />
  }

  // No extra properties in object
  if (schema?.additionalProperties === false) {
    yield <NoExtraPropertiesQM key={"no-extra-properties"} />
  }

  // minItems / maxItems
  if (schema.minItems !== undefined || schema.maxItems !== undefined) {
    yield <ArrayNumberOfItemsQM key={"arrayItems"} schema={schema} />
  }

  // minContains / maxContains
  if (
    (schema as JSONSchemaNS.Array).minContains !== undefined ||
    (schema as JSONSchemaNS.Array).maxContains !== undefined
  ) {
    yield <ArrayContainsNumberQM key={"arrayContains"} schema={schema} />
  }

  // No extra items in array
  if (schema?.items === false || schema?.additionalItems === false) {
    yield <NoExtraItemsQM key={"no-extra-items"} />
  }

  // minimum / exclusiveMinimum / maximum / exclusiveMaximum
  if (
    schema.minimum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMaximum !== undefined
  ) {
    yield <NumberBoundsQM key={"number-range"} schema={schema} />
  }

  // pattern
  if (schema.pattern !== undefined) {
    yield <PatternQM key={"pattern"} schema={schema} />
  }

  // multipleOf
  if (schema.multipleOf !== undefined) {
    yield <MultipleOfQM key={"multipleOf"} schema={schema} />
  }

  // uniqueItems
  if (schema.uniqueItems !== undefined && schema.uniqueItems === true) {
    yield <ArrayUniqueItemsQM key={"uniqueItems"} />
  }

  // Default value
  if (schema.default !== undefined) {
    yield <DefaultValueQM key={"default"} schema={schema} />
  }

  // Const value
  if (schema.const !== undefined) {
    yield <ConstantQM key={"const"} schema={schema} />
  }
}

// The heart of the plugin : Display human friendly messages
export default function QualifierMessages(props: Props): null | JSX.Element {
  const { schema } = props

  // Find out which messages will be triggered
  let result = [...conditionallyRenderQMs(schema)]

  if (result.length === 0) {
    return null
  } else {
    return <>{result}</>
  }
}
