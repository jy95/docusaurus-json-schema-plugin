import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "boolean"
export default function BooleanLabel(): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.boolean",
        }}
      >
        {"boolean"}
      </Translate>
    </span>
  )
}
