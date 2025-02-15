import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "array"
export default function ArrayLabel(): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.array",
        }}
      >
        {"array"}
      </Translate>
    </span>
  )
}
