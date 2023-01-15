import React from "react"
import {
  RenderAnyOneOf,
  CreateNodes,
  CreateProperties,
  CreateEdges,
  CreateAdditionalProperties,
} from "./index"

import type { JSONSchema7 } from "json-schema"
import type { WithRequired } from "./index"

function createItems(schema: WithRequired<JSONSchema7, "items">): JSX.Element {
  if (Array.isArray(schema.items)) {
    let entries = Object.entries(
      schema.items.filter((sub) => typeof sub !== "boolean") as JSONSchema7[]
    )

    return (
      <>
        {entries.map(([key, val]) => (
          <CreateEdges
            name={key}
            schema={val}
            required={
              Array.isArray(val?.required) ? val.required.includes(key) : false
            }
            key={key}
          />
        ))}
      </>
    )
  } else {
    if (typeof schema.items === "boolean") {
      return <></>
    }

    let typedItems = schema.items

    if (typedItems.properties !== undefined) {
      return (
        <CreateProperties
          schema={typedItems as WithRequired<JSONSchema7, "properties">}
        />
      )
    }

    if (typedItems.additionalProperties !== undefined) {
      return (
        <CreateAdditionalProperties
          schema={
            typedItems as WithRequired<JSONSchema7, "additionalProperties">
          }
        />
      )
    }

    if (typedItems.oneOf !== undefined || typedItems.anyOf !== undefined) {
      return (
        <RenderAnyOneOf
          schema={
            typedItems as
              | WithRequired<JSONSchema7, "oneOf">
              | WithRequired<JSONSchema7, "anyOf">
          }
        />
      )
    }

    // Let the createNodes do the rest
    return <CreateNodes schema={typedItems} />
  }
}

export default createItems
