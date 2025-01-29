import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "and"
// And label (commonly used in multiple situation)
export default function AndLabel(): JSX.Element {
  const SPACE = <>&nbsp;</>

  return (
    <>
      {SPACE}
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.and",
          }}
        >
          {"AND"}
        </Translate>
      </strong>
      {SPACE}
    </>
  )
}
