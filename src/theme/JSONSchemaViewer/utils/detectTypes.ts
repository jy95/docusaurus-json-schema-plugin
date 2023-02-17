import type { JSONSchema, JSONSchemaNS, TypeValues } from "../types"

// Utility functions to know which case we have
export const isObjectType = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.type === "object" ||
    (Array.isArray(schema.type) && schema.type.some((s) => s === "object")) ||
    schema.properties !== undefined ||
    schema.additionalProperties !== undefined ||
    schema.patternProperties !== undefined ||
    schema.propertyNames !== undefined ||
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined ||
    schema.required !== undefined)

export const isArrayType = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.type === "array" ||
    (Array.isArray(schema.type) && schema.type.some((s) => s === "array")) ||
    schema.items !== undefined ||
    schema.minItems !== undefined ||
    schema.maxItems !== undefined ||
    schema.additionalItems !== undefined ||
    schema.contains !== undefined ||
    (schema as JSONSchemaNS.Array).minContains !== undefined ||
    (schema as JSONSchemaNS.Array).maxContains !== undefined ||
    (schema as JSONSchemaNS.Array).prefixItems !== undefined ||
    Array.isArray(schema.const) ||
    schema.enum?.some((s) => Array.isArray(s)))

export const isStringType = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.type === "string" ||
    (Array.isArray(schema.type) && schema.type.some((s) => s === "string")) ||
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined ||
    schema.enum?.some((val) => typeof val === "string") ||
    typeof schema.const === "string")

export const isNumeric = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.type === "number" ||
    (Array.isArray(schema.type) && schema.type.some((s) => s === "number")) ||
    schema.multipleOf !== undefined ||
    schema.minimum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.enum?.some((val) => typeof val === "number") ||
    typeof schema.const === "number")

// To detect integer, which is a subtype of "number"
export const isInteger = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.type === "integer" ||
    (Array.isArray(schema.type) && schema.type.some((s) => s === "integer")) ||
    schema.multipleOf === 1 ||
    schema.enum?.some((val) => typeof val === "bigint") ||
    typeof schema.const === "bigint")

export const isSchemaComposition = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.allOf !== undefined ||
    schema.anyOf !== undefined ||
    schema.oneOf !== undefined ||
    schema.not !== undefined)

export const isSchemaConditional = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.if !== undefined ||
    schema.dependencies !== undefined ||
    (schema as JSONSchemaNS.Object).dependentRequired !== undefined ||
    (schema as JSONSchemaNS.Object).dependentSchemas !== undefined)

export const isBoolean = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema.type === "boolean" ||
    (Array.isArray(schema.type) && schema.type.some((s) => s === "boolean")) ||
    schema.enum?.some((val) => typeof val === "boolean") ||
    typeof schema?.const === "boolean")

export const isNull = (schema: JSONSchema) =>
  typeof schema !== "boolean" &&
  (schema?.type === "null" ||
    (Array.isArray(schema.type) && schema.type.some((s) => s === "null")) ||
    schema.enum?.some((val) => val === null) ||
    schema.const === null)

// Detect types in schema
// Zero, One or multiple types can match
function* foundUndeclaredTypes(
  schema: Exclude<JSONSchema, true | false>
): Generator<TypeValues, void> {
  if (isNull(schema)) {
    yield "null"
  }

  if (isObjectType(schema)) {
    yield "object"
  }

  if (isArrayType(schema)) {
    yield "array"
  }

  if (isStringType(schema)) {
    yield "string"
  }

  if (isBoolean(schema)) {
    yield "boolean"
  }

  /* istanbul ignore if  */
  if (isInteger(schema)) {
    yield "integer"
  }

  if (!isInteger(schema) && isNumeric(schema)) {
    yield "number"
  }

  // Job finished
  return undefined
}

// Return types provided by user or detected by this library
export function detectedTypes(
  schema: Exclude<JSONSchema, true | false>
): TypeValues[] {
  // Find declarated type(s) provided by user
  const declaredTypes: TypeValues[] = Array.isArray(schema.type)
    ? schema.type
    : schema.type !== undefined
    ? [schema.type]
    : []

  // If not empty, return it as it
  if (declaredTypes.length !== 0) {
    return declaredTypes
  }

  // Find undeclared type(s)
  // If array is empty, it could mean that it is either "any" or "nothing"
  return [...foundUndeclaredTypes(schema)]
}
