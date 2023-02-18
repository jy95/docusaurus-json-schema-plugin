import React from "react"

import Translate from "@docusaurus/Translate"

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
