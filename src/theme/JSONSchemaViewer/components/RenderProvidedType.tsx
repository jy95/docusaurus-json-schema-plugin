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
  type?: TypeValues
  nullable?: boolean
}

export default function RenderProvidedType({
  schema,
  type,
  nullable,
}: RenderProvidedTypeProps): JSX.Element {
  switch (type) {
    case "array":
      return <CreateArray schema={schema} nullable={nullable} />
    case "object":
      return <CreateObject schema={schema} nullable={nullable} />
    case "string":
      return <CreateString schema={schema} nullable={nullable} />
    case "boolean":
      return <CreateBoolean schema={schema} nullable={nullable} />
    case "number":
      return <CreateNumber schema={schema} nullable={nullable} />
    case "integer":
      return <CreateInteger schema={schema} nullable={nullable} />
    case "null":
      return <CreateNull schema={schema} />
    default:
      return <CreateValidOrInvalid schema={schema} />
  }
}
