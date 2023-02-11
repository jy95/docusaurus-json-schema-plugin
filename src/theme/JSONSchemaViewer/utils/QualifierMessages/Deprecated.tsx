import React from "react"

import Translate from "@docusaurus/Translate"

export default function Deprecated(): JSX.Element {
  const deprecatedLabel = (
    <Translate
      values={{
        id: "json-schema.labels.deprecated",
      }}
    >
      {"Deprecated"}
    </Translate>
  )

  return (
    <div key={"deprecated"}>
      🚨&nbsp;
      {deprecatedLabel}
    </div>
  )
}
