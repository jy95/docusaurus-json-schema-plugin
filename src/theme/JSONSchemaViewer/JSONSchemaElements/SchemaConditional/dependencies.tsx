import React from "react"

import { DependentRequired, DependentSchemas } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

function Dependencies(props: Props): JSX.Element {
  const { schema } = props

  // Fast fail
  if (typeof schema === "boolean") {
    return <></>
  }

  let dependencies = schema?.dependencies!

  // If the dependency value was an array, it would behave like dependentRequired
  if (Array.isArray(dependencies)) {
    // Beter be safe and use a restricted schema
    let tweakedSchema = { dependentRequired: dependencies } as JSONSchema
    return <DependentRequired schema={tweakedSchema} />
  }

  // if the dependency value was a schema, it would behave like dependentSchemas
  let tweakedSchema = { dependentSchemas: dependencies } as JSONSchema
  return <DependentSchemas schema={tweakedSchema} />
}

export default Dependencies
