import React from "react"

import { generateFriendlyName } from "../utils/index"
import { CreateDetailsNode } from "./index"

import type { JSONSchema7, JSONSchema7Definition } from "json-schema"

// Creates the edges or "leaves" of a schema tree. Edges can branch into sub-nodes with createDetails().
type EdgeProps = {
  name: string
  schema: JSONSchema7Definition
  required: string[] | boolean
}

function createEdges({ name, schema, required }: EdgeProps): JSX.Element {
  const schemaName = generateFriendlyName(schema)

  if (typeof schema === "boolean") {
    // TODO
    return <></>
  }

  if (schema?.oneOf || schema?.anyOf) {
    return CreateDetailsNode(name, schemaName, schema, required)
  }

  if (schema?.properties) {
    return CreateDetailsNode(name, schemaName, schema, required)
  }

  if (schema?.additionalProperties) {
    return CreateDetailsNode(name, schemaName, schema, required)
  }

  // Items can be primitive or something else more useful to display
  let items = (
    schema?.items !== undefined
      ? Array.isArray(schema.items)
        ? schema.items
        : [schema.items]
      : []
  ).filter((item) => typeof item !== "boolean") as JSONSchema7[]

  if (
    items.some(
      (item) =>
        item.properties !== undefined ||
        item.anyOf !== undefined ||
        item.oneOf !== undefined
    )
  ) {
    return CreateDetailsNode(name, schemaName, schema, required)
  }

  //primitives and array of non-objects

  /*
  
    // TODO migrate this code
  
    // primitives and array of non-objects
    return create("SchemaItem", {
      collapsible: false,
      name,
      required: Array.isArray(required) ? required.includes(name) : required,
      deprecated: schema.deprecated,
      schemaDescription: schema.description,
      schemaName: schemaName,
      qualifierMessage: getQualifierMessage(schema),
      defaultValue: schema.default,
    });
  
    */
}

export default createEdges
