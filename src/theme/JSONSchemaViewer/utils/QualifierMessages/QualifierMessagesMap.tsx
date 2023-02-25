import React from "react"

import * as QMS from "./index"

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
export type CheckKey =
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
  | "contentMediaType"
  | "contentEncoding"
  | "contentSchema"

// Available qualifier message
const CHECKS_MAP: Record<CheckKey, CheckInfo> = {
  nullable: {
    match: ({ nullable }) => nullable === true,
    Component: () => <QMS.NullableQM key={"nullable"} />,
  },
  deprecated: {
    match: ({ schema }) => (schema as JSONSchemaNS.Object).deprecated === true,
    Component: () => <QMS.DeprecatedQM key={"deprecated"} />,
  },
  readOnly: {
    match: ({ schema }) => (schema as JSONSchemaNS.Object).readOnly === true,
    Component: () => <QMS.ReadOnlyQM key={"readOnly"} />,
  },
  writeOnly: {
    match: ({ schema }) => (schema as JSONSchemaNS.Object).writeOnly === true,
    Component: () => <QMS.WriteOnlyQM key={"writeOnly"} />,
  },
  enum: {
    match: ({ schema }) => schema.enum !== undefined,
    Component: ({ schema }) => <QMS.EnumQM key={"enum"} schema={schema} />,
  },
  stringLength: {
    match: ({ schema }) =>
      schema.minLength !== undefined || schema.maxLength !== undefined,
    Component: ({ schema }) => (
      <QMS.StringLengthQM key={"stringLength"} schema={schema} />
    ),
  },
  objectProperties: {
    match: ({ schema }) =>
      schema.minProperties !== undefined || schema.maxProperties !== undefined,
    Component: ({ schema }) => (
      <QMS.ObjectPropertiesQM key={"objectProperties"} schema={schema} />
    ),
  },
  "no-extra-properties": {
    match: ({ schema }) => schema.additionalProperties === false,
    Component: () => <QMS.NoExtraPropertiesQM key={"no-extra-properties"} />,
  },
  arrayItems: {
    match: ({ schema }) =>
      schema.minItems !== undefined || schema.maxItems !== undefined,
    Component: ({ schema }) => (
      <QMS.ArrayNumberOfItemsQM key={"arrayItems"} schema={schema} />
    ),
  },
  arrayContains: {
    match: ({ schema }) =>
      (schema as JSONSchemaNS.Array).minContains !== undefined ||
      (schema as JSONSchemaNS.Array).maxContains !== undefined,
    Component: ({ schema }) => (
      <QMS.ArrayContainsNumberQM key={"arrayContains"} schema={schema} />
    ),
  },
  "no-extra-items": {
    match: ({ schema }) =>
      schema.items === false || schema.additionalItems === false,
    Component: () => <QMS.NoExtraItemsQM key={"no-extra-items"} />,
  },
  "number-range": {
    match: ({ schema }) =>
      schema.minimum !== undefined ||
      schema.exclusiveMinimum !== undefined ||
      schema.maximum !== undefined ||
      schema.exclusiveMaximum !== undefined,
    Component: ({ schema }) => (
      <QMS.NumberBoundsQM key={"number-range"} schema={schema} />
    ),
  },
  pattern: {
    match: ({ schema }) => schema.pattern !== undefined,
    Component: ({ schema }) => (
      <QMS.PatternQM key={"pattern"} schema={schema} />
    ),
  },
  multipleOf: {
    match: ({ schema }) => schema.multipleOf !== undefined,
    Component: ({ schema }) => (
      <QMS.MultipleOfQM key={"multipleOf"} schema={schema} />
    ),
  },
  uniqueItems: {
    match: ({ schema }) =>
      schema.uniqueItems !== undefined && schema.uniqueItems === true,
    Component: () => <QMS.ArrayUniqueItemsQM key={"uniqueItems"} />,
  },
  default: {
    match: ({ schema }) => schema.default !== undefined,
    Component: ({ schema }) => (
      <QMS.DefaultValueQM key={"default"} schema={schema} />
    ),
  },
  const: {
    match: ({ schema }) => schema.const !== undefined,
    Component: ({ schema }) => <QMS.ConstantQM key={"const"} schema={schema} />,
  },
  examples: {
    match: ({ schema, options }) =>
      options.showExamples === true && schema.examples !== undefined,
    Component: ({ schema }) => (
      <QMS.ExamplesQM key={"examples"} schema={schema} />
    ),
  },
  contentMediaType: {
    match: ({ schema }) => schema.contentMediaType !== undefined,
    Component: ({ schema }) => (
      <QMS.ContentMediaTypeQM key={"contentMediaType"} schema={schema} />
    ),
  },
  contentEncoding: {
    match: ({ schema }) => schema.contentEncoding !== undefined,
    Component: ({ schema }) => (
      <QMS.ContentEncodingQM key={"contentEncoding"} schema={schema} />
    ),
  },
  contentSchema: {
    match: ({ schema }) =>
      (schema as JSONSchemaNS.String).contentSchema !== undefined,
    Component: ({ schema }) => (
      <QMS.ContentSchemaQM
        key={"contentSchema"}
        schema={schema as JSONSchemaNS.String}
      />
    ),
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
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  "default",
  "const",
  "examples",
]

export { CHECKS_MAP, DEFAULT_ORDER }
