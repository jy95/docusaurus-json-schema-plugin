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

  // Distinguish dependentRequired inside dependencies
  const dependentRequired = Object.entries(dependencies)
    // If the dependency value was an array, it would behave like dependentRequired
    .filter(([_, subSchema]) => Array.isArray(subSchema))
    .reduce((acc, [property, subSchema]) => {
      acc[property] = subSchema as readonly string[]
      return acc
    }, {} as Record<string, string[] | readonly string[]>)

  // Distinguish dependentSchemas inside dependencies
  const dependentSchemas = Object.entries(dependencies)
    // if the dependency value was a schema, it would behave like dependentSchemas
    .filter(([_, subSchema]) => !Array.isArray(subSchema))
    .reduce((acc, [property, subSchema]) => {
      acc[property] = subSchema as JSONSchema
      return acc
    }, {} as Record<string, JSONSchema>)

  return (
    <>
      {Object.keys(dependentRequired).length > 0 && (
        <DependentRequired
          schema={
            {
              dependentRequired: dependentRequired,
            } as JSONSchema
          }
        />
      )}
      {Object.keys(dependentSchemas).length > 0 && (
        <DependentSchemas
          schema={
            {
              dependentSchemas: dependentSchemas,
            } as JSONSchema
          }
        />
      )}
    </>
  )
}

export default Dependencies
