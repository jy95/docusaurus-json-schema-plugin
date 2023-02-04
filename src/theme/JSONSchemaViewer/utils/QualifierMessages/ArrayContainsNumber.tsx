import React from "react"

import Translate from "@docusaurus/Translate"

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
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.contains",
          }}
        >
          {"Must contain : "}
        </Translate>
      </strong>
      &nbsp;
      {typedArraySchema?.minContains !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.minContains",
              count: typedArraySchema.minContains,
            }}
          >
            {"at least {count} valid item(s)"}
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
      {typedArraySchema?.maxContains !== undefined && (
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.maxContains",
              count: typedArraySchema.maxContains,
            }}
          >
            {"at most {count} valid item(s)"}
          </Translate>
        </code>
      )}
    </div>
  )
}
