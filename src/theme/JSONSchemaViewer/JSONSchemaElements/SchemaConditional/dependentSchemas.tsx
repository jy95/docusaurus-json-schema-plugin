import React from "react"

import { AllOfSchema } from "@theme/JSONSchemaViewer/JSONSchemaElements/schemaComposition"

import type { JSX } from "react"
import type { JSONSchema, JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

export default function DependentSchemas(props: Props): JSX.Element {
  const { schema } = props

  let dependentSchemas = (schema as JSONSchemaNS.Object).dependentSchemas!

  // simplified schema : in fact, dependentSchemas is an combination of "allOf" with "if" / "then" as element
  let simplifiedSchema: Exclude<JSONSchema, true | false> = {
    allOf: Object.entries(dependentSchemas).map(([property, subSchema]) => ({
      if: {
        type: "object",
        required: [property],
      },
      then: subSchema,
    })),
  }

  // Let's reuse "AllOfSchema" for this part
  return <AllOfSchema schema={simplifiedSchema} />
}
