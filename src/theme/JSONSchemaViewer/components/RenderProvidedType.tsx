import React from "react"

import { CreateValidOrInvalid } from "./index"

import {
  CreateObject,
  CreateArray,
  CreateString,
  CreateBoolean,
  CreateNumber,
  CreateInteger,
  CreateNull,
} from "../JSONSchemaElements/index"

import type { JSONSchema, TypeValues } from "../types"

// Utily function to render a specific type
type RenderProvidedTypeProps = {
  schema: JSONSchema
  type: TypeValues
  nullable?: boolean
}

export default function RenderProvidedType({
  schema,
  type,
}: RenderProvidedTypeProps): JSX.Element {
  switch (type) {
    case "array":
      return <CreateArray schema={schema} />
    case "object":
      return <CreateObject schema={schema} />
    case "string":
      return <CreateString schema={schema} />
    case "boolean":
      return <CreateBoolean schema={schema} />
    case "number":
      return <CreateNumber schema={schema} />
    case "integer":
      return <CreateInteger schema={schema} />
    case "null":
      return <CreateNull schema={schema} />
    default:
      return <CreateValidOrInvalid schema={schema} />
  }
}
