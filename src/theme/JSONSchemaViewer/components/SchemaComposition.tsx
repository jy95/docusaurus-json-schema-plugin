import React from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "./index"

import type { JSONSchema7, JSONSchema7Definition } from "json-schema"
import type { WithRequired } from "./index"

type SchemaCompositionType =
  | WithRequired<JSONSchema7, "oneOf">
  | WithRequired<JSONSchema7, "anyOf">
  | WithRequired<JSONSchema7, "allOf">
  | WithRequired<JSONSchema7, "not">

type Props = {
  schema: SchemaCompositionType
  [x: string]: any
}

type DetectedFormat = {
  typeOf: "oneOf" | "anyOf" | "allOf" | "not"
  foundSchema: JSONSchema7Definition[]
}

// Utility function to detect which kind of schema we have to deal with
function detectTypeSchemaComposition(
  schema: SchemaCompositionType
): DetectedFormat {
  if (schema?.allOf !== undefined) {
    return {
      typeOf: "allOf",
      foundSchema: schema.allOf,
    }
  }

  if (schema?.anyOf !== undefined) {
    return {
      typeOf: "anyOf",
      foundSchema: schema.anyOf,
    }
  }

  if (schema?.oneOf !== undefined) {
    return {
      typeOf: "oneOf",
      foundSchema: schema.oneOf,
    }
  }

  return {
    typeOf: "not",
    foundSchema: schema?.not !== undefined ? [schema.not] : [],
  }
}

// To handle Schema Composition (anyOf, oneOf, not, allOf)
function SchemaComposition(props: Props): JSX.Element {
  const { schema } = props
  const { foundSchema, typeOf } = detectTypeSchemaComposition(schema)

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <Tabs>
        {foundSchema.map((compositeSchema, index) => {
          const label =
            (typeof compositeSchema !== "boolean" && compositeSchema?.title) ||
            `${index + 1}`

          return (
            <TabItem
              key={`schema_${typeOf}_${index}`}
              value={`schema_${typeOf}_${index}`}
              label={label}
            >
              <CreateNodes schema={compositeSchema} />
            </TabItem>
          )
        })}
      </Tabs>
    </div>
  )
}

export default SchemaComposition
