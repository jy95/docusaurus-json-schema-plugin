import React from "react"

import Translate from "@docusaurus/Translate"

import { AndLabel } from "./index"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
}

// minProperties
function MinProperties({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.minProperties",
          count: value,
        }}
      >
        {">= {count} propertie(s)"}
      </Translate>
    </code>
  )
}

// maxProperties
function MaxProperties({ value }: { value: number }): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.keywords.maxProperties",
          count: value,
        }}
      >
        {"<= {count} propertie(s)"}
      </Translate>
    </code>
  )
}

// minProperties / maxProperties
export default function ObjectProperties(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  if (typeof schema === "boolean") {
    return null
  }

  let minAndMax =
    schema?.minProperties !== undefined && schema?.maxProperties !== undefined

  const propertiesLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.lengthProperties",
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
          ? "minPropertiesAndMaxProperties"
          : schema?.minProperties !== undefined
          ? "minProperties"
          : "maxProperties"
      }
    >
      {propertiesLabel}
      &nbsp;
      {schema?.minProperties !== undefined && (
        <MinProperties value={schema?.minProperties} />
      )}
      {minAndMax && <AndLabel />}
      {schema?.maxProperties !== undefined && (
        <MaxProperties value={schema?.maxProperties} />
      )}
    </div>
  )
}
