import React from "react"

import Translate from "@docusaurus/Translate"
//import Details from "@theme-original/Details";

import { IfElseThen } from "./index"
import { Collapsible } from "../../components/index"

import type { JSONSchema /*, JSONSchemaNS*/ } from "../../types"

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
  /*
  const isDependentRequired =
    (schema as JSONSchemaNS.Object)?.dependentRequired !== undefined
  const isDependentSchemas =
    (schema as JSONSchemaNS.Object)?.dependentSchemas !== undefined
  const isDependenncies = schema?.dependencies
  */
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
      {isIfThenElse && <IfElseThen schema={schema} />}
    </Collapsible>
  )
}

export default SchemaConditional
