import React from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

export default function RequiredLabel(): JSX.Element {
  return (
    <strong className={styles.required}>
      <Translate
        values={{
          id: "json-schema.keywords.required",
        }}
      >
        {"required"}
      </Translate>
    </strong>
  )
}
