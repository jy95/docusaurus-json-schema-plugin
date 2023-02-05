import React from "react"

import Translate from "@docusaurus/Translate"

import { AndLabel } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
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
  props: Props
): null | JSX.Element {
  const { schema } = props

  // fast fail
  if (typeof schema === "boolean") {
    return null
  }

  let minAndMaxLength =
    schema?.minLength !== undefined && schema?.maxLength !== undefined

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
          : schema?.minLength !== undefined
          ? "minLength"
          : "maxLength"
      }
    >
      {lengthLabel}
      &nbsp;
      {schema?.minLength !== undefined && (
        <MinLength value={schema?.minLength} />
      )}
      {minAndMaxLength && <AndLabel />}
      {schema?.maxLength !== undefined && (
        <MaxLength value={schema?.maxLength} />
      )}
    </div>
  )
}
