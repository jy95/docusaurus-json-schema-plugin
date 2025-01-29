import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Single type label
export default function TypeLabel(): JSX.Element {
  return (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.type",
          count: 1,
        }}
      >
        {"type"}
      </Translate>
    </strong>
  )
}
