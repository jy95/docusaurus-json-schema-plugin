import React from "react"

import { CreateEdge } from "../../components/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  schema: JSONSchema7
  [x: string]: any
}

// Generate propertyNames
function propertyNames(props: Props): JSX.Element {
  const { schema } = props
  let propertyNames = schema.propertyNames!

  // Fast Fail over
  if (
    typeof propertyNames === "boolean" ||
    propertyNames?.pattern === undefined
  ) {
    return <></>
  }

  // As propertyNames doesn't care about type below, we can remove "pattern" for next calls
  // So we are not misguided to consider it as string
  let pattern = propertyNames.pattern
  let newSchema = { ...propertyNames }
  delete newSchema.pattern

  return (
    <CreateEdge
      key={"propertyNames"}
      name={<code>{pattern}</code>}
      schema={newSchema}
      required={false}
    />
  )
}

export default propertyNames