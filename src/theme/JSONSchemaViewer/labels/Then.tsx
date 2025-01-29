import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "then"
export default function ThenLabel(): JSX.Element {
  return (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.then",
        }}
      >
        {"Then"}
      </Translate>
    </strong>
  )
}
