import React from "react"

import {
  CreateObject,
  SchemaComposition,
  SchemaConditional,
  CreateArray,
  CreatePrimitive,
} from "../JSONSchemaElements/index"

import {
  isArrayType,
  isObjectType,
  isSchemaComposition,
  isSchemaConditional,
} from "../utils/index"

import type { JSONSchema } from "../types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

function createNodes(props: Props): JSX.Element {
  const { schema } = props

  // In boolean case, we can do anything
  if (typeof schema === "boolean") {
    return <></>
  }

  // Type Checks
  const isArray = isArrayType(schema)
  const isObject = isObjectType(schema)
  const isComposition = isSchemaComposition(schema)
  const isConditional = isSchemaConditional(schema)
  const isFallback = !isArray && !isObject && !isComposition

  return (
    <>
      {/* handle array case */}
      {isArray && <CreateArray schema={schema} />}
      {/* handle object case */}
      {isObject && <CreateObject schema={schema} />}
      {/* handle anyOf / allOf / oneOf / not  */}
      {isComposition && <SchemaComposition schema={schema} />}
      {/* fallback, in case none of the previous lines match */}
      {isFallback && <CreatePrimitive schema={schema} />}
      {/* Conditional part of the schema */}
      {isConditional && <SchemaConditional schema={schema} />}
    </>
  )
}

export default createNodes
