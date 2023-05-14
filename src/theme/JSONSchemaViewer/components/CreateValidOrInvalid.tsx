import React from "react"

import {
  CreateAlwaysInvalid,
  CreateAlwaysValid,
} from "@theme/JSONSchemaViewer/JSONSchemaElements/index"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

// Handle the "true" / "false" cases we can find in schemas
export default function CreateValidOrInvalid(props: Props): JSX.Element {
  const { schema } = props

  /**
   * Cases to cover
   * CreateAlwaysValid = true / {}
   * CreateAlwaysInvalid = false
   */
  return (
    <>
      {schema && <CreateAlwaysValid schema={schema} />}
      {!schema && <CreateAlwaysInvalid />}
    </>
  )
}
