import React from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

export default function ConstantLabel(): JSX.Element {
  return (
    <strong className={styles.constant}>
      <Translate
        values={{
          id: "json-schema.keywords.const",
        }}
      >
        {"constant"}
      </Translate>
    </strong>
  )
}
