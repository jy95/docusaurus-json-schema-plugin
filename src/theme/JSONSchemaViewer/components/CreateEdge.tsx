import React, { ReactNode } from "react"

import { SchemaItem } from "@theme/JSONSchemaViewer/components"

import type { JSX } from "react"
import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

// Creates the edge or "leave" of a schema tree. Edge can branch into sub-nodes.
type EdgeProps = {
  // Name of the attribute
  name: ReactNode
  // the schema of this attribute
  schema: JSONSchema
  // Is property is required or not
  required: boolean
}

export default function CreateEdge({
  name,
  schema,
  required,
}: EdgeProps): JSX.Element {
  return <SchemaItem name={name} schema={schema} required={required} />
}
