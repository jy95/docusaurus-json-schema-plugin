import React from "react"

import { DependentRequired, DependentSchemas } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

export default function Dependencies(props: Props): JSX.Element {
  const { schema } = props

  let dependencies = schema.dependencies!

  // Split dependencies into dependentRequired / dependentSchemas
  let result = Object.entries(dependencies).reduce(
    (acc, [property, subSchema]) => {
      if (Array.isArray(subSchema)) {
        // dependentRequired case
        acc["dependentRequired"][property] = subSchema
      } else {
        // dependentSchemas case
        acc["dependentSchemas"][property] = subSchema as JSONSchema
      }

      // return result
      return acc
    },
    {
      dependentRequired: {} as Record<string, string[] | readonly string[]>,
      dependentSchemas: {} as Record<string, JSONSchema>,
    }
  )

  return (
    <>
      {Object.keys(result.dependentRequired).length > 0 && (
        <DependentRequired
          schema={{
            dependentRequired: result.dependentRequired,
          }}
        />
      )}
      {Object.keys(result.dependentSchemas).length > 0 && (
        <DependentSchemas
          schema={{
            dependentSchemas: result.dependentSchemas,
          }}
        />
      )}
    </>
  )
}
