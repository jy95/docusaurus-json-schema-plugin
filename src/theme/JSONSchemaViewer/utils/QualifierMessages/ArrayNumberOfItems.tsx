import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
}

// minItems / maxItems
export default function ArrayNumberOfItems(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  if (typeof schema === "boolean") {
    return null
  }

  let minAndMax =
    schema?.minItems !== undefined && schema?.maxItems !== undefined

  // Translated label
  const lengthLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.lengthItems",
        }}
      >
        {"Length :"}
      </Translate>
    </strong>
  )

  const minItemsLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.minItems",
          count: schema?.minItems || 0,
        }}
      >
        {">= {count}"}
      </Translate>
    </code>
  )

  const andLabel = (
    <>
      &nbsp;
      <Translate
        values={{
          id: "json-schema.labels.and",
        }}
      >
        {"AND"}
      </Translate>
      &nbsp;
    </>
  )

  const maxItemsLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.maxItems",
          count: schema?.maxItems || "∞",
        }}
      >
        {"<= {count}"}
      </Translate>
    </code>
  )

  return (
    <div
      key={
        minAndMax
          ? "minItemsAndmaxItems"
          : schema?.minItems !== undefined
          ? "minItems"
          : "maxItems"
      }
    >
      {lengthLabel}
      &nbsp;
      {schema?.minItems !== undefined && minItemsLabel}
      {minAndMax && andLabel}
      {schema?.maxItems !== undefined && maxItemsLabel}
    </div>
  )
}
