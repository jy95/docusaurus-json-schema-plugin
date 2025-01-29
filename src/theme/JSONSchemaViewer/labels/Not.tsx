import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "not"
export default function NotLabel(): JSX.Element {
  return (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.not",
        }}
      >
        {"NOT"}
      </Translate>
    </strong>
  )
}
