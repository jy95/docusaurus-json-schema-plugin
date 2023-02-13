import type { JSONSchema, JSONSchemaNS } from "../types"

// Utility functions to know which case we have
export const isObjectType = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.type === "object" ||
    schema?.properties !== undefined ||
    schema?.additionalProperties !== undefined ||
    schema?.patternProperties !== undefined ||
    schema?.propertyNames !== undefined ||
    schema?.minProperties !== undefined ||
    schema?.maxProperties !== undefined)

export const isArrayType = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.type === "array" ||
    schema?.items !== undefined ||
    schema?.minItems !== undefined ||
    schema?.maxItems !== undefined ||
    schema?.additionalItems !== undefined ||
    schema?.contains !== undefined ||
    (schema as JSONSchemaNS.Array).minContains !== undefined ||
    (schema as JSONSchemaNS.Array).maxContains !== undefined ||
    (schema as JSONSchemaNS.Array).prefixItems !== undefined)

export const isStringType = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.type === "string" ||
    schema?.minLength !== undefined ||
    schema?.maxLength !== undefined ||
    schema?.pattern !== undefined)

export const isNumeric = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.type === "integer" ||
    schema?.type === "number" ||
    schema?.multipleOf !== undefined ||
    schema?.minimum !== undefined ||
    schema?.exclusiveMinimum !== undefined ||
    schema?.maximum !== undefined ||
    schema?.exclusiveMaximum !== undefined)

export const isSchemaComposition = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.allOf !== undefined ||
    schema?.anyOf !== undefined ||
    schema?.oneOf !== undefined ||
    schema?.not !== undefined)

export const isSchemaConditional = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.if !== undefined ||
    schema?.dependencies !== undefined ||
    (schema as JSONSchemaNS.Object).dependentRequired !== undefined ||
    (schema as JSONSchemaNS.Object).dependentSchemas !== undefined)

export const isBoolean = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.type === "boolean" ||
    schema?.enum?.every((val) => typeof val === "boolean"))
