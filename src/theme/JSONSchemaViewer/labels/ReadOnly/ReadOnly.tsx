import React from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

export default function ReadOnlyLabel(): JSX.Element {
  return (
    <strong className={styles.readOnly}>
      <Translate
        values={{
          id: "json-schema.keywords.readOnly",
        }}
      >
        {"readOnly"}
      </Translate>
    </strong>
  )
}
