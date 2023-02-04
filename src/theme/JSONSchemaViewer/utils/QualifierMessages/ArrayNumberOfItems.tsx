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
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.lengthItems",
          }}
        >
          {"Length :"}
        </Translate>
      </strong>
      &nbsp;
      {schema?.minItems !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.minItems",
              count: schema.minItems,
            }}
          >
            {">= {count}"}
          </Translate>
        </code>
      )}
      {minAndMax && (
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
      )}
      {schema?.maxItems !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.maxItems",
              count: schema.maxItems,
            }}
          >
            {"<= {count}"}
          </Translate>
        </code>
      )}
    </div>
  )
}
