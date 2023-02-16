import React from "react"

import Translate from "@docusaurus/Translate"

export default function Nullable(): JSX.Element {
  const nullable = (
    <Translate
      values={{
        id: "json-schema.labels.nullable",
      }}
    >
      {"Nullable"}
    </Translate>
  )

  return (
    <div key={"nullable"}>
      ❓&nbsp;
      {nullable}
    </div>
  )
}
