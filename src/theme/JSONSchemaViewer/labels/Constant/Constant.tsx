import React from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

import type { JSX } from "react"

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
