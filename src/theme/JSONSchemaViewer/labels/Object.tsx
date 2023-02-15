import React from "react"

import Translate from "@docusaurus/Translate"

// Label for "object"
export default function ObjectLabel(): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.object",
        }}
      >
        {"object"}
      </Translate>
    </span>
  )
}
