import React from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "./index"

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
        {(schema[typeOf] as JSONSchema7Definition[]).map(
          (anyOneSchema, index) => {
            const label =
              (typeof anyOneSchema !== "boolean" && anyOneSchema?.title) ||
              `${index + 1}`

            return (
              <TabItem
                key={`anyOneSchema_${index}`}
                value={`anyOneSchema_${index}`}
                label={label}
              >
                {CreateNodes(anyOneSchema)}
              </TabItem>
            )
          }
        )}
      </Tabs>
    </div>
  )
}

export default renderAnyOneOf
