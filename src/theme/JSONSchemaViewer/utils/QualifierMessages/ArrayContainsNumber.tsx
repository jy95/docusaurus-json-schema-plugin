import React from "react"

import Translate from "@docusaurus/Translate"

import { AndLabel } from "./index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema?: JSONSchema
}

// minContains
function MinContains({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.minContains",
          count: value,
        }}
      >
        {"at least {count} valid item(s)"}
      </Translate>
    </code>
  )
}

// maxContains
function MaxContains({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.maxContains",
          count: value,
        }}
      >
        {"at most {count} valid item(s)"}
      </Translate>
    </code>
  )
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
      {typedArraySchema?.minContains !== undefined && (
        <MinContains value={typedArraySchema?.minContains} />
      )}
      {minAndMax && <AndLabel />}
      {typedArraySchema?.maxContains !== undefined && (
        <MaxContains value={typedArraySchema?.maxContains} />
      )}
    </div>
  )
}
