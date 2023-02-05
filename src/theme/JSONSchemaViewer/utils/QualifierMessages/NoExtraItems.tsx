import React from "react"

import Translate from "@docusaurus/Translate"

export default function NoExtraItems(): JSX.Element {
  const noExtraItemsLabel = (
    <Translate
      values={{
        id: "json-schema.labels.noExtraItems",
      }}
    >
      {"No extra item(s) are authorized in this array"}
    </Translate>
  )

  return (
    <div key={"no-extra-items"}>
      🚨&nbsp;
      {noExtraItemsLabel}
    </div>
  )
}
