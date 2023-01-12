import React from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateProperties } from "./index"

import type { JSONSchema7, JSONSchema7Definition } from "json-schema"
import type { WithRequired } from "./index"

// To handle Schema Composition (anyOf, oneOf)
// Remind that thanks prefiltering, we don't have to handle allOf case
function renderAnyOneOf(
  schema:
    | WithRequired<JSONSchema7, "oneOf">
    | WithRequired<JSONSchema7, "anyOf">
): JSX.Element {
  let typeOf: "oneOf" | "anyOf" = schema.oneOf ? "oneOf" : "anyOf"

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <Tabs>
        {(schema[typeOf] as JSONSchema7Definition[])
          // JSONSchema7Definition is either boolean or JSONSchema7 so better be safe that sorry
          .filter((subSchema) => typeof subSchema !== "boolean")
          .map((anyOneSchema, index) => {
            let subSchema = anyOneSchema as JSONSchema7
            const label = subSchema?.title || `${index + 1}`

            // TODO
            return (
              <TabItem
                key={`anyOneSchema_${index}`}
                value={`anyOneSchema_${index}`}
                label={label}
              >
                {/* Print the properties contained, if any */}
                {subSchema.properties !== undefined &&
                  CreateProperties(
                    subSchema as WithRequired<JSONSchema7, "properties">
                  )}
              </TabItem>
            )
          })}
      </Tabs>
    </div>
  )
}

export default renderAnyOneOf
