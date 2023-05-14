import React from "react"

import { CreateTypes } from "@theme/JSONSchemaViewer/components/index"

import {
  SchemaComposition,
  SchemaConditional,
} from "@theme/JSONSchemaViewer/JSONSchemaElements/index"

import { CreateValidOrInvalid } from "@theme/JSONSchemaViewer/components/index"

import {
  isSchemaComposition,
  isSchemaConditional,
} from "@theme/JSONSchemaViewer/utils/index"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  schema: JSONSchema
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

  return (
    <>
      {/* Handle standard types */}
      <CreateTypes schema={schema} />
      {/* handle anyOf / allOf / oneOf / not  */}
      {isComposition && <SchemaComposition schema={schema} />}
      {/* Conditional part of the schema */}
      {isConditional && <SchemaConditional schema={schema} />}
    </>
  )
}
