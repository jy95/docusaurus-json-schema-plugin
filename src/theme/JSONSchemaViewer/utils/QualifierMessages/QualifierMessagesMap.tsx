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
  ExamplesQM,
  DeprecatedQM,
  ReadOnlyQM,
  WriteOnlyQM,
  NullableQM,
} from "./index"

import type { JSONSchema, JSONSchemaNS } from "../../types"
import type { JSVOptions } from "../../contexts/index"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  options: JSVOptions
  nullable?: boolean
}

// To generify the addition of qualifier messages in the future
interface CheckInfo {
  // To check if qualifier message should be invoked
  match: (props: Props) => boolean
  // To render the component when asked
  Component: (props: Props) => JSX.Element
}

// What are the possible checks for user
type CheckKey =
  | "nullable"
  | "deprecated"
  | "readOnly"
  | "writeOnly"
  | "enum"
  | "stringLength"
  | "objectProperties"
  | "no-extra-properties"
  | "arrayItems"
  | "arrayContains"
  | "no-extra-items"
  | "number-range"
  | "pattern"
  | "multipleOf"
  | "uniqueItems"
  | "default"
  | "const"
  | "examples"

// Available qualifier message
const CHECKS_MAP: Record<CheckKey, CheckInfo> = {
  nullable: {
    match: ({ nullable }) => nullable === true,
    Component: () => <NullableQM key={"nullable"} />,
  },
  deprecated: {
    match: ({ schema }) => (schema as JSONSchemaNS.Object).deprecated === true,
    Component: () => <DeprecatedQM key={"deprecated"} />,
  },
  readOnly: {
    match: ({ schema }) => (schema as JSONSchemaNS.Object).readOnly === true,
    Component: () => <ReadOnlyQM key={"readOnly"} />,
  },
  writeOnly: {
    match: ({ schema }) => (schema as JSONSchemaNS.Object).writeOnly === true,
    Component: () => <WriteOnlyQM key={"writeOnly"} />,
  },
  enum: {
    match: ({ schema }) => schema.enum !== undefined,
    Component: ({ schema }) => <EnumQM key={"enum"} schema={schema} />,
  },
  stringLength: {
    match: ({ schema }) =>
      schema.minLength !== undefined || schema.maxLength !== undefined,
    Component: ({ schema }) => (
      <StringLengthQM key={"stringLength"} schema={schema} />
    ),
  },
  objectProperties: {
    match: ({ schema }) =>
      schema.minProperties !== undefined || schema.maxProperties !== undefined,
    Component: ({ schema }) => (
      <ObjectPropertiesQM key={"objectProperties"} schema={schema} />
    ),
  },
  "no-extra-properties": {
    match: ({ schema }) => schema.additionalProperties === false,
    Component: () => <NoExtraPropertiesQM key={"no-extra-properties"} />,
  },
  arrayItems: {
    match: ({ schema }) =>
      schema.minItems !== undefined || schema.maxItems !== undefined,
    Component: ({ schema }) => (
      <ArrayNumberOfItemsQM key={"arrayItems"} schema={schema} />
    ),
  },
  arrayContains: {
    match: ({ schema }) =>
      (schema as JSONSchemaNS.Array).minContains !== undefined ||
      (schema as JSONSchemaNS.Array).maxContains !== undefined,
    Component: ({ schema }) => (
      <ArrayContainsNumberQM key={"arrayContains"} schema={schema} />
    ),
  },
  "no-extra-items": {
    match: ({ schema }) =>
      schema.items === false || schema.additionalItems === false,
    Component: () => <NoExtraItemsQM key={"no-extra-items"} />,
  },
  "number-range": {
    match: ({ schema }) =>
      schema.minimum !== undefined ||
      schema.exclusiveMinimum !== undefined ||
      schema.maximum !== undefined ||
      schema.exclusiveMaximum !== undefined,
    Component: ({ schema }) => (
      <NumberBoundsQM key={"number-range"} schema={schema} />
    ),
  },
  pattern: {
    match: ({ schema }) => schema.pattern !== undefined,
    Component: ({ schema }) => <PatternQM key={"pattern"} schema={schema} />,
  },
  multipleOf: {
    match: ({ schema }) => schema.multipleOf !== undefined,
    Component: ({ schema }) => (
      <MultipleOfQM key={"multipleOf"} schema={schema} />
    ),
  },
  uniqueItems: {
    match: ({ schema }) =>
      schema.uniqueItems !== undefined && schema.uniqueItems === true,
    Component: () => <ArrayUniqueItemsQM key={"uniqueItems"} />,
  },
  default: {
    match: ({ schema }) => schema.default !== undefined,
    Component: ({ schema }) => (
      <DefaultValueQM key={"default"} schema={schema} />
    ),
  },
  const: {
    match: ({ schema }) => schema.const !== undefined,
    Component: ({ schema }) => <ConstantQM key={"const"} schema={schema} />,
  },
  examples: {
    match: ({ schema, options }) =>
      options.showExamples === true && schema.examples !== undefined,
    Component: ({ schema }) => <ExamplesQM key={"examples"} schema={schema} />,
  },
}

// Default order I assume
const DEFAULT_ORDER: CheckKey[] = [
  "nullable",
  "deprecated",
  "readOnly",
  "writeOnly",
  "enum",
  "stringLength",
  "objectProperties",
  "no-extra-properties",
  "arrayItems",
  "arrayContains",
  "no-extra-items",
  "number-range",
  "pattern",
  "multipleOf",
  "uniqueItems",
  "default",
  "const",
  "examples",
]

// TODO integrate contentMediaType / contentEncoding / contentSchema

export { CHECKS_MAP, DEFAULT_ORDER }
