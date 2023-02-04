import React from "react"

import Translate from "@docusaurus/Translate"

export default function NoExtraItems(): JSX.Element {
  return (
    <div key={"no-extra-items"}>
      🚨&nbsp;
      <Translate
        values={{
          id: "json-schema.labels.noExtraItems",
        }}
      >
        {"No extra item(s) are authorized in this array"}
      </Translate>
    </div>
  )
}
