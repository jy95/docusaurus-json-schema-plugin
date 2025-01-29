import React from "react"
import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

export default function LoadingLabel(): JSX.Element {
  return (
    <div>
      <Translate
        values={{
          id: "json-schema.labels.loading",
        }}
      >
        {"Loading ...."}
      </Translate>
    </div>
  )
}
