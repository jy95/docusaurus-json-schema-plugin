import React from "react"

import {
  QUALIFIERS_DEFAULT_ORDER,
  QUALIFIERS_MAP,
} from "./QualifierMessages/index"

import type { JSONSchema } from "../types"
import type { JSVOptions } from "../contexts/index"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  options: JSVOptions
  nullable?: boolean
}

// The heart of the plugin : Display human friendly messages
export default function QualifierMessages(props: Props): null | JSX.Element {
  // Find out which messages will be triggered
  return (
    <>
      {QUALIFIERS_DEFAULT_ORDER.filter((item) =>
        QUALIFIERS_MAP[item].match(props)
      ).map((item) => QUALIFIERS_MAP[item].Component(props))}
    </>
  )
}
