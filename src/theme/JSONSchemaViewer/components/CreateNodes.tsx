import React from "react"

import {
  CreateObject,
  SchemaComposition,
  SchemaConditional,
  CreateArray,
  CreateString
} from "../JSONSchemaElements/index"

import { CreateValidOrInvalid } from "./index"

import {
  isArrayType,
  isObjectType,
  isStringType,
  isSchemaComposition,
  isSchemaConditional,
} from "../utils/index"

import type { JSONSchema, TypeValues } from "../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

// Utily function to render a specific type
function RenderProvidedType({schema, type}: {schema: JSONSchema, type: TypeValues}) : JSX.Element {
  switch(type) {
    case "array":
      return <CreateArray schema={schema} />
    case "object":
      return <CreateObject schema={schema} />
    case "string":
      return <CreateString schema={schema} />
    default:
      return <></>
  }

}

// Entry point
export default function CreateNodes(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <CreateValidOrInvalid schema={schema} />
  }

  // Type Checks
  const isComposition = isSchemaComposition(schema)
  const isConditional = isSchemaConditional(schema)

  // Find declarated type(s) provided by user
  const declaredTypes : TypeValues[] = Array.isArray(schema.type) 
    ? schema.type
    : schema.type !== undefined 
      ? [schema.type]
      : []

  // Several possibilities
  // 1. User only used a single type (most common case)
  // 2. User used multiple types (e.g. ["string", "null"] or ["string", "number"])
  // 3. User didn't use any type and so we must "guess" what (s)he have in mind

  // Let's cover simple cases first
  // Either a single type that is nullable by 2019-09 specs of by Draft 07
  const hasNull = declaredTypes.includes("null");
  if (declaredTypes.length === 1 || (hasNull && declaredTypes.length === 2) ) {
    return (
      <>
        <RenderProvidedType schema={schema} type={declaredTypes[0]} />
        {/* handle anyOf / allOf / oneOf / not  */}
        {isComposition && <SchemaComposition schema={schema} />}
        {/* Conditional part of the schema */}
        {isConditional && <SchemaConditional schema={schema} />}
      </>
    )
  }

  // 

  // TODO other cases


  return (
    <>
      {/* handle array case */}
      {isArray && <CreateArray schema={schema} />}
      {/* handle object case */}
      {isObject && <CreateObject schema={schema} />}
      {/* handle anyOf / allOf / oneOf / not  */}
      {isComposition && <SchemaComposition schema={schema} />}
      {/* Conditional part of the schema */}
      {isConditional && <SchemaConditional schema={schema} />}
      {/* fallback, in case none of the previous lines match */}
      {isFallback && <CreatePrimitive schema={schema} />}
    </>
  )
}
