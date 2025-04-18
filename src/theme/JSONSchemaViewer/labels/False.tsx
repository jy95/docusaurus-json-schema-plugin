import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "false"
export default function FalseLabel(): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.false",
        }}
      >
        {"none"}
      </Translate>
    </span>
  )
}
