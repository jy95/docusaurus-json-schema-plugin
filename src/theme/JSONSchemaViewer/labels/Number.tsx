import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "number"
export default function NumberLabel(): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.number",
        }}
      >
        {"number"}
      </Translate>
    </span>
  )
}
