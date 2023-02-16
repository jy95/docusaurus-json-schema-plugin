import React from "react"

import Translate from "@docusaurus/Translate"

// Label for "null"
export default function NullLabel(): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.null",
        }}
      >
        {"null"}
      </Translate>
    </span>
  )
}
