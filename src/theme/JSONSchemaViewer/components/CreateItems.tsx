import {
  RenderAnyOneOf,
  CreateNodes,
  CreateProperties,
  CreateEdges,
  CreateAdditionalProperties,
} from "./index"

import type { ReactNode } from "react"
import type { JSONSchema7 } from "json-schema"
import type { WithRequired } from "./index"

function createItems(schema: WithRequired<JSONSchema7, "items">): ReactNode {
  if (Array.isArray(schema.items)) {
    return Object.entries(
      schema.items.filter((sub) => typeof sub !== "boolean") as JSONSchema7[]
    ).map(([key, val]) =>
      CreateEdges({
        name: key,
        schema: val,
        required: Array.isArray(val?.required)
          ? val.required.includes(key)
          : false,
      })
    )
  } else {
    if (typeof schema.items === "boolean") {
      return undefined
    }

    let typedItems = schema.items

    if (typedItems.properties !== undefined) {
      return CreateProperties(
        typedItems as WithRequired<JSONSchema7, "properties">
      )
    }

    if (typedItems.additionalProperties !== undefined) {
      return CreateAdditionalProperties(
        typedItems as WithRequired<JSONSchema7, "additionalProperties">
      )
    }

    if (typedItems.oneOf !== undefined || typedItems.anyOf !== undefined) {
      return RenderAnyOneOf(
        typedItems as
          | WithRequired<JSONSchema7, "oneOf">
          | WithRequired<JSONSchema7, "anyOf">
      )
    }

    // Let the createNodes do the rest
    return CreateNodes(typedItems)
  }
}

export default createItems
