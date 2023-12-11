import React from "react"

import Translate from "@docusaurus/Translate"

import { AndLabel } from "@theme/JSONSchemaViewer/labels"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

// minItems
function MinItems({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.minItems",
          count: value,
        }}
      >
        {">= {count}"}
      </Translate>
    </code>
  )
}

// maxItems
function MaxItems({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.maxItems",
          count: value,
        }}
      >
        {"<= {count}"}
      </Translate>
    </code>
  )
}

// minItems / maxItems
export default function ArrayNumberOfItems(props: Props): JSX.Element {
  const { schema } = props

  let minAndMax = schema.minItems !== undefined && schema.maxItems !== undefined

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

  return (
    <div
      key={
        minAndMax
          ? "minItemsAndmaxItems"
          : schema.minItems !== undefined
            ? "minItems"
            : "maxItems"
      }
    >
      {lengthLabel}
      &nbsp;
      {schema.minItems !== undefined && <MinItems value={schema.minItems} />}
      {minAndMax && <AndLabel />}
      {schema.maxItems !== undefined && <MaxItems value={schema.maxItems} />}
    </div>
  )
}
