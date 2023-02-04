import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
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
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.lengthProperties",
          }}
        >
          {"Length :"}
        </Translate>
      </strong>
      &nbsp;
      {schema?.minProperties !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.minProperties",
              count: schema.minProperties,
            }}
          >
            {">= {count} propertie(s)"}
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
      {schema?.maxProperties !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.maxProperties",
              count: schema.maxProperties,
            }}
          >
            {"<= {count} propertie(s)"}
          </Translate>
        </code>
      )}
    </div>
  )
}
