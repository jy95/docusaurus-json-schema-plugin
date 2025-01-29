import React from "react"

import { AllOfSchema } from "@theme/JSONSchemaViewer/JSONSchemaElements/schemaComposition"

import type { JSX } from "react"
import type { JSONSchema, JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

export default function DependentRequired(props: Props): JSX.Element {
  const { schema } = props

  let dependentRequired = (schema as JSONSchemaNS.Object).dependentRequired!

  // simplified schema : in fact, dependentRequired is an combination of "allOf" with "if" / "then" as element
  let simplifiedSchema: Exclude<JSONSchema, true | false> = {
    allOf: Object.entries(dependentRequired).map(
      ([property, requiredProperties]) => ({
        if: {
          type: "object",
          required: [property],
        },
        then: {
          type: "object",
          required: requiredProperties,
        },
      }),
    ),
  }

  // Let's reuse "AllOfSchema" for this part
  return <AllOfSchema schema={simplifiedSchema} />
}
