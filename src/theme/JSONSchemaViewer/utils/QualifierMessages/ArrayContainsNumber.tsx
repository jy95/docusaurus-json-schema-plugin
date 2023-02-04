import React from "react"

import Translate from "@docusaurus/Translate"

import { AndLabel } from "./index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema?: JSONSchema
}

// minContains / maxContains
export default function ArrayContainsNumber(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  if (typeof schema === "boolean") {
    return null
  }

  let typedArraySchema = schema as JSONSchemaNS.Array

  let minAndMax =
    typedArraySchema?.minContains !== undefined &&
    typedArraySchema?.maxContains !== undefined

  // Translated labels
  const containsLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.contains",
        }}
      >
        {"Must contain : "}
      </Translate>
    </strong>
  )

  const minLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.minContains",
          count: typedArraySchema?.minContains || 0,
        }}
      >
        {"at least {count} valid item(s)"}
      </Translate>
    </code>
  )

  const maxLabel = (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.maxContains",
          count: typedArraySchema.maxContains || "∞",
        }}
      >
        {"at most {count} valid item(s)"}
      </Translate>
    </code>
  )

  return (
    <div
      key={
        minAndMax
          ? "minContainsAndmaxContains"
          : typedArraySchema?.minContains !== undefined
          ? "minContains"
          : "maxContains"
      }
    >
      {containsLabel}
      &nbsp;
      {typedArraySchema?.minContains !== undefined && minLabel}
      {minAndMax && <AndLabel />}
      {typedArraySchema?.maxContains !== undefined && maxLabel}
    </div>
  )
}
