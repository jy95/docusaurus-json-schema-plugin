import React from "react"
import Translate from "@docusaurus/Translate"

import type { JSX } from "react"

export default function ErrorOccurredLabel(props: {
  error: Error
}): JSX.Element {
  const { error } = props
  return (
    <Translate
      values={{
        id: "json-schema.labels.errorOccurred",
        message: error.message,
      }}
    >
      {"Something bad happens : {message}"}
    </Translate>
  )
}
