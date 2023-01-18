import React from "react"

import {
  CreateObject,
  SchemaComposition,
  CreateArray,
  CreatePrimitive,
} from "../JSONSchemaElements/index"

import { isArrayType, isObjectType, isSchemaComposition } from "../utils/index"

import type { JSONSchema7Definition } from "json-schema"

type Props = {
  [x: string]: any
  schema: JSONSchema7Definition
}

function createNodes(props: Props): JSX.Element {
  const { schema } = props

  // In boolean case, we can do anything
  if (typeof schema === "boolean") {
    return <></>
  }

  // handle anyOf / allOf / oneOf / not
  if (isSchemaComposition(schema)) {
    return <SchemaComposition schema={schema} />
  }

  // handle array case
  if (isArrayType(schema)) {
    return <CreateArray schema={schema} />
  }

  // handle object case
  if (isObjectType(schema)) {
    return <CreateObject schema={schema} />
  }

  // Well from now; two situations
  // 1. Either it is a primitive type left (string / integer / numeric /boolean / null)
  // 2. Schema is invalid and so component will crash
  return <CreatePrimitive schema={schema} />
}

export default createNodes
