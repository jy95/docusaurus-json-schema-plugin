import React from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

import type { JSX } from "react"

export default function WriteOnlyLabel(): JSX.Element {
  return (
    <strong className={styles.writeOnly}>
      <Translate
        values={{
          id: "json-schema.keywords.writeOnly",
        }}
      >
        {"writeOnly"}
      </Translate>
    </strong>
  )
}
