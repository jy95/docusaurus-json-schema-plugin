import React from "react"

import Translate from "@docusaurus/Translate"

// Label for "if"
export default function IfLabel(): JSX.Element {
  return (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.if",
        }}
      >
        {"If"}
      </Translate>
    </strong>
  )
}
