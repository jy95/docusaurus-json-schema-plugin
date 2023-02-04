import React from "react"

import Translate from "@docusaurus/Translate"

export default function ArrayUniqueItems(): JSX.Element {
  return (
    <div key={"uniqueItems"}>
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.uniqueItems",
          }}
        >
          {"Unique items :"}
        </Translate>
      </strong>
      &nbsp;
      <code>
        <Translate
          values={{
            id: "json-schema.labels.uniqueItemsOnly",
          }}
        >
          {"yes"}
        </Translate>
      </code>
    </div>
  )
}
