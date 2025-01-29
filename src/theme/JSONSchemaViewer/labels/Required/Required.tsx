import React from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

import type { JSX } from "react"

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
