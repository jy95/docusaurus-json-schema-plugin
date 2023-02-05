import React from "react"

import Translate from "@docusaurus/Translate"

export default function ArrayUniqueItems(): JSX.Element {
  // Translated labels
  const uniqueItemsLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.uniqueItems",
        }}
      >
        {"Unique items :"}
      </Translate>
    </strong>
  )

  const uniqueItemsOnlyLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.labels.uniqueItemsOnly",
        }}
      >
        {"yes"}
      </Translate>
    </code>
  )

  return (
    <div key={"uniqueItems"}>
      {uniqueItemsLabel}
      &nbsp;
      {uniqueItemsOnlyLabel}
    </div>
  )
}
