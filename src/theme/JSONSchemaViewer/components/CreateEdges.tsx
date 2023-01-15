import React from "react"
import { generateFriendlyName } from "../utils/index"
import { CreateDetailsNode } from "./index"

import type { JSONSchema7Definition } from "json-schema"

// Creates the edges or "leaves" of a schema tree. Edges can branch into sub-nodes with createDetails().
type EdgeProps = {
  name: string
  schema: JSONSchema7Definition
  required: string[] | boolean
}

// TODO
function createEdges({ name, schema, required }: EdgeProps): JSX.Element {
  const schemaName = generateFriendlyName(schema)

  // TODO review that later
  if (typeof schema === "boolean") {
    return <></>
  }

  // Most of the time, createDetailsNode do the job recursively
  return (
    <CreateDetailsNode
      name={name}
      schemaName={schemaName}
      required={required}
      schema={schema}
    />
  )

  /* TODO check that part later
  //primitives and array of non-objects
  return (
    <SchemaItem
      collapsible={false}
      name={name}
      schema={schema}
      schemaName={schemaName}
    />
  )*/
}

export default createEdges
