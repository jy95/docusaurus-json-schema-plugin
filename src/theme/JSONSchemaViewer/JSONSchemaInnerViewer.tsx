import React from "react"

import type { JSONSchema7 } from "json-schema"

type InnerViewerProperties = {
  // Thanks to json-schema-merge-allof , we don't have allOf in the whole user schema
  // Thanks to @stoplight/json-ref-resolver, $ref are :
  // 1. resolved
  schema: Omit<JSONSchema7, "allOf">
}

// External
function JSONSchemaInnerViewer(props: InnerViewerProperties): JSX.Element {
  return <></>
}

export default JSONSchemaInnerViewer
