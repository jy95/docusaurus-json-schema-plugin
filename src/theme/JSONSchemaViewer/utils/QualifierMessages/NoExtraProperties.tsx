import React from "react"

import Translate from "@docusaurus/Translate"

export default function NoExtraProperties(): JSX.Element {
  const noExtraPropertiesLabel = (
    <Translate
      values={{
        id: "json-schema.labels.noExtraProperties",
      }}
    >
      {"No extra propertie(s) are authorized in this object"}
    </Translate>
  )

  return (
    <div key={"no-extra-properties"}>
      🚨&nbsp;
      {noExtraPropertiesLabel}
    </div>
  )
}
