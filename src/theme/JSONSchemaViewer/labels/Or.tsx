import React from "react"

import Translate from "@docusaurus/Translate"

// Label for "or"
export default function OrLabel(): JSX.Element {
  const SPACE = <>&nbsp;</>

  return (
    <>
      {SPACE}
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.or",
          }}
        >
          {"OR"}
        </Translate>
      </strong>
      {SPACE}
    </>
  )
}
