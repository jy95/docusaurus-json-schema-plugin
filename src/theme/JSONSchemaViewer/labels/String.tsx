import React from "react"

import Translate from "@docusaurus/Translate"

// Label for "string"
export default function StringLabel({
  format,
}: {
  format?: string
}): JSX.Element {
  return (
    <span style={{ opacity: "0.6" }}>
      <Translate
        values={{
          id: "json-schema.keywords.string",
        }}
      >
        {"string"}
      </Translate>
      {format !== undefined && <>&nbsp;{`(${format})`}</>}
    </span>
  )
}
