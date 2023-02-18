import React from "react"

import Translate from "@docusaurus/Translate"

import {
  IfElseThen,
  DependentRequired,
  DependentSchemas,
  Dependencies,
} from "./index"
import { Collapsible } from "../../components/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

// To handle Schema Conditional (if-then-else , dependentRequired , dependentSchemas , dependencies )
function SchemaConditional(props: Props): JSX.Element {
  const { schema } = props

  // Checks
  const isIfThenElse = schema.if !== undefined

  const isDependentRequired =
    (schema as JSONSchemaNS.Object).dependentRequired !== undefined
  const isDependentSchemas =
    (schema as JSONSchemaNS.Object).dependentSchemas !== undefined
  const isDependencies = schema.dependencies !== undefined

  const schemaConditionalLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.schemaConditional",
        }}
      >
        {"Conditional subschemas"}
      </Translate>
    </strong>
  )

  return (
    <Collapsible
      summary={schemaConditionalLabel}
      detailsProps={{
        open: true,
      }}
    >
      {/* Handles if-then-else case */}
      {isIfThenElse && <IfElseThen schema={schema} />}
      {/* Handles dependentRequired case */}
      {isDependentRequired && <DependentRequired schema={schema} />}
      {/* Handles dependentSchemas case */}
      {isDependentSchemas && <DependentSchemas schema={schema} />}
      {/* Handles dependencies (deprecated) */}
      {isDependencies && <Dependencies schema={schema} />}
    </Collapsible>
  )
}

export default SchemaConditional
