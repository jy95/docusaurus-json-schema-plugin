import React from "react"

import Translate from "@docusaurus/Translate"

export default function WriteOnly(): JSX.Element {
  const readOnlyLabel = (
    <Translate
      values={{
        id: "json-schema.labels.writeOnly",
      }}
    >
      {"write only"}
    </Translate>
  )

  return (
    <div key={"writeOnly"}>
      🚨&nbsp;
      {readOnlyLabel}
    </div>
  )
}
