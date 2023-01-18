import React from "react"
import { CreateItems } from "./index"

import { isArrayType, isObjectType, isSchemaComposition } from "../utils/index"

import { CreateObject, SchemaComposition } from "../JSONSchemaElements/index"

import type { JSONSchema7, JSONSchema7Definition } from "json-schema"

type Props = {
  [x: string]: any
  schema: JSONSchema7Definition
}

// Creates a hierarchical level of a schema tree. Nodes produce edges that can branch into sub-nodes with edges, recursively
function createNodes(props: Props): JSX.Element {
  const { schema } = props

  // fast fail over
  if (typeof schema === "boolean" || schema === undefined) {
    return <></>
  }

  // allOf / anyOf / oneOf / not
  if (isSchemaComposition(schema)) {
    return <SchemaComposition schema={schema} />
  }

  // For array
  if (isArrayType(schema)) {
    // TODO
    return <></>
  }

  // TODO unsupported stuff (later)
  // 2. additionalItems

  // Unknown node/schema type will return nothing (<></>)
  return (
    <>
      {/* Type */}
      {typedSchema?.type !== undefined && (
        <CreatePrimitive
          key={"type"}
          schema={typedSchema as WithRequired<JSONSchema7, "type">}
        />
      )}
      {/* Handle oneOf / anyOf / allOf / not */}
      {(typedSchema?.oneOf !== undefined ||
        typedSchema?.anyOf !== undefined ||
        typedSchema?.allOf !== undefined ||
        typedSchema?.not !== undefined) && (
        <SchemaComposition
          key={"schemaComposition"}
          schema={
            typedSchema as
              | WithRequired<JSONSchema7, "oneOf">
              | WithRequired<JSONSchema7, "anyOf">
              | WithRequired<JSONSchema7, "allOf">
              | WithRequired<JSONSchema7, "not">
          }
        />
      )}
      {/* Properties */}
      {typedSchema?.properties !== undefined && (
        <CreateProperties
          key={"properties"}
          schema={typedSchema as WithRequired<JSONSchema7, "properties">}
        />
      )}
      {/* additionalProperties */}
      {typedSchema?.additionalProperties !== undefined && (
        <CreateAdditionalProperties
          key={"additionalProperties"}
          schema={
            typedSchema as WithRequired<JSONSchema7, "additionalProperties">
          }
        />
      )}
      {/* Items */}
      {typedSchema?.items !== undefined && (
        <CreateItems
          key={"items"}
          schema={typedSchema.items as WithRequired<JSONSchema7, "items">}
        />
      )}
    </>
  )
}

export default createNodes
