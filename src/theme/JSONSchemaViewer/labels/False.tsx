import React from "react"

import Translate from "@docusaurus/Translate"

// Label for "false"
export default function FalseLabel(): JSX.Element {
  return (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.false",
        }}
      >
        {"none"}
      </Translate>
    </strong>
  )
}
