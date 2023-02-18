import React from "react"

import Translate from "@docusaurus/Translate"

// Label for "true"
export default function TrueLabel(): JSX.Element {
  return (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.true",
        }}
      >
        {"any"}
      </Translate>
    </strong>
  )
}
