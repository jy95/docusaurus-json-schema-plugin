import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
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
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.length",
          }}
        >
          {"Length :"}
        </Translate>
      </strong>
      &nbsp;
      {schema?.minLength !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.minLength",
              count: schema.minLength,
            }}
          >
            {">= {count} character(s)"}
          </Translate>
        </code>
      )}
      {minAndMaxLength && (
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
      {schema?.maxLength !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.maxLength",
              count: schema.maxLength,
            }}
          >
            {"<= {count} character(s)"}
          </Translate>
        </code>
      )}
    </div>
  )
}
