import React from "react"

import {
  QUALIFIERS_MAP,
  QUALIFIERS_DEFAULT_ORDER,
} from "@theme/JSONSchemaViewer/utils/QualifierMessages/index"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"
import type { JSVOptions } from "@theme/JSONSchemaViewer/contexts/index"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  options: JSVOptions
  nullable?: boolean
}

// The heart of the plugin : Display human friendly messages
export default function QualifierMessages(props: Props): null | JSX.Element {
  const { options } = props
  // If the user wants to overwrite the default order
  const QUALIFIER_ORDER =
    options.qualifierMessagesOrder || QUALIFIERS_DEFAULT_ORDER

  // Find out which messages will be triggered
  return (
    <>
      {QUALIFIER_ORDER.filter((item) => QUALIFIERS_MAP[item].match(props)).map(
        (item) => QUALIFIERS_MAP[item].Component(props)
      )}
    </>
  )
}
