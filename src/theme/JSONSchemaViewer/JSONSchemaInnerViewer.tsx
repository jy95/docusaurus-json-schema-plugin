import React from "react"
import { CreateNodes } from "./components/index"

import type { JSONSchema7 } from "json-schema"

type InnerViewerProperties = {
  // Thanks to json-schema-merge-allof , we don't have allOf in the whole user schema
  // Thanks to @stoplight/json-ref-resolver, $ref are either :
  // 1. resolved
  // 2. unresolved (as circular stuff are not on the roadmap)
  schema: Omit<JSONSchema7, "allOf">
}

// External
function JSONSchemaInnerViewer(props: InnerViewerProperties): JSX.Element {
  return <ul style={{ marginLeft: "1rem" }}>{CreateNodes(props.schema)}</ul>
}

export default JSONSchemaInnerViewer
