import React from "react"

import Translate from "@docusaurus/Translate"

import { AndLabel } from "@theme/JSONSchemaViewer/labels"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
}

// minLength
function MinLength({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.minLength",
          count: value,
        }}
      >
        {">= {count} character(s)"}
      </Translate>
    </code>
  )
}

// maxLength
function MaxLength({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.maxLength",
          count: value,
        }}
      >
        {"<= {count} character(s)"}
      </Translate>
    </code>
  )
}

// for minLength / maxLength
export default function StringLengthQualifierMessage(
  props: Props,
): JSX.Element {
  const { schema } = props

  let minAndMaxLength =
    schema.minLength !== undefined && schema.maxLength !== undefined

  // Translated label
  const lengthLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.length",
        }}
      >
        {"Length :"}
      </Translate>
    </strong>
  )

  return (
    <div
      key={
        minAndMaxLength
          ? "minLengthAndmaxLength"
          : schema.minLength !== undefined
          ? "minLength"
          : "maxLength"
      }
    >
      {lengthLabel}
      &nbsp;
      {schema.minLength !== undefined && <MinLength value={schema.minLength} />}
      {minAndMaxLength && <AndLabel />}
      {schema.maxLength !== undefined && <MaxLength value={schema.maxLength} />}
    </div>
  )
}
