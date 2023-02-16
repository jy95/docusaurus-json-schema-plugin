import React from "react"
import Translate from "@docusaurus/Translate"

import { TypeLabel, TrueLabel } from "../labels/index"

// When schema has the value "true", it means that it is ALWAYS valid
export default function CreateAlwaysValid(): JSX.Element {
  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <TrueLabel />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <Translate
          values={{
            id: "json-schema.labels.true",
          }}
        >
          {"Always valid"}
        </Translate>
      </div>
    </>
  )
}
