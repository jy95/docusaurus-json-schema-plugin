import React from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

export default function DeprecatedLabel(): JSX.Element {
  return (
    <strong className={styles.deprecated}>
      <Translate
        values={{
          id: "json-schema.keywords.deprecated",
        }}
      >
        {"deprecated"}
      </Translate>
    </strong>
  )
}
