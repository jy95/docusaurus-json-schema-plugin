import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

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
