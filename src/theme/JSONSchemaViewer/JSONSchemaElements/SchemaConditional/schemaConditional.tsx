import React from "react"

import Translate from "@docusaurus/Translate"
//import Details from "@theme-original/Details";

import { IfElseThen, DependentRequired, DependentSchemas } from "./index"
import { Collapsible } from "../../components/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

// To handle Schema Conditional (if-then-else , dependentRequired , dependentSchemas , dependencies )
function SchemaConditional(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <></>
  }

  // Checks
  const isIfThenElse = schema?.if !== undefined

  const isDependentRequired =
    (schema as JSONSchemaNS.Object)?.dependentRequired !== undefined
  const isDependentSchemas =
    (schema as JSONSchemaNS.Object)?.dependentSchemas !== undefined
  //const isDependenncies = schema?.dependencies !== undefined

  return (
    <Collapsible
      summary={
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.schemaConditional",
            }}
          >
            {"Conditional subschemas"}
          </Translate>
        </strong>
      }
    >
      {/* Handles if-then-else case */}
      {isIfThenElse && <IfElseThen schema={schema} />}
      {/* Handles dependentRequired case */}
      {isDependentRequired && <DependentRequired schema={schema} />}
      {/* Handles dependentSchemas case */}
      {isDependentSchemas && <DependentSchemas schema={schema} />}
    </Collapsible>
  )
}

export default SchemaConditional
