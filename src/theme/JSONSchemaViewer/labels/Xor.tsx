import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

// Label for "xor"
export default function XorLabel(): JSX.Element {
  const SPACE = <>&nbsp;</>

  return (
    <>
      {SPACE}
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.xor",
          }}
        >
          {"XOR"}
        </Translate>
      </strong>
      {SPACE}
    </>
  )
}
