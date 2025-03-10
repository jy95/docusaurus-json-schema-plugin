import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "integer"
export default function IntegerLabel(): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.integer",
        }}
      >
        {"integer"}
      </Translate>
    </span>
  )
}
