import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "if"
export default function IfLabel(): JSX.Element {
  return (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.else",
        }}
      >
        {"Else"}
      </Translate>
    </strong>
  )
}
