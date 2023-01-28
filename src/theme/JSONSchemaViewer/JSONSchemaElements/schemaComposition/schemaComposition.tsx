import React from "react"

import { AllOfSchema, AnyOfSchema, NotSchema, OneOfSchema } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

// To handle Schema Composition (anyOf, oneOf, not, allOf)
function SchemaComposition(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <></>
  }

  if (schema?.oneOf !== undefined) {
    return <OneOfSchema schema={schema.oneOf} />
  }

  if (schema?.anyOf !== undefined) {
    return <AnyOfSchema schema={schema.anyOf} />
  }

  if (schema?.allOf !== undefined) {
    return <AllOfSchema schema={schema.allOf} />
  }

  if (schema?.not !== undefined) {
    return NotSchema({ schema: schema.not })
  }

  // Default situation
  return <></>
}

export default SchemaComposition
