import type { JSONSchema7 } from "json-schema"

// Utility functions to know which case we have
export const isObjectType = (schema: JSONSchema7) =>
  schema?.type === "object" ||
  schema?.properties !== undefined ||
  schema?.additionalProperties !== undefined ||
  schema?.patternProperties !== undefined ||
  schema?.minProperties !== undefined ||
  schema?.maxProperties

export const isArrayType = (schema: JSONSchema7) =>
  schema?.type === "array" ||
  schema?.items !== undefined ||
  schema?.minItems !== undefined ||
  schema?.maxItems !== undefined ||
  schema?.additionalItems !== undefined ||
  schema?.contains !== undefined ||
  /* @ts-ignore Draft 2019-09 */
  schema?.minContains !== undefined ||
  /* @ts-ignore Draft 2019-09 */
  schema?.maxContains !== undefined

export const isStringType = (schema: JSONSchema7) =>
  schema?.type === "string" ||
  schema?.minLength !== undefined ||
  schema?.maxLength !== undefined ||
  schema?.pattern !== undefined

export const isNumeric = (schema: JSONSchema7) =>
  schema?.type === "integer" ||
  schema?.type === "number" ||
  schema?.multipleOf !== undefined ||
  schema?.minimum !== undefined ||
  schema?.exclusiveMinimum !== undefined ||
  schema?.maximum !== undefined ||
  schema?.exclusiveMaximum !== undefined

export const isSchemaComposition = (schema: JSONSchema7) =>
  schema?.allOf !== undefined ||
  schema?.anyOf !== undefined ||
  schema?.oneOf !== undefined ||
  schema?.not !== undefined