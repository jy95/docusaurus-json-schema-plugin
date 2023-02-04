import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
}

// minimum / exclusiveMinimum / maximum / exclusiveMaximum
export default function NumberBounds(props: Props): null | JSX.Element {
  const { schema } = props

  // fast fail
  if (typeof schema === "boolean") {
    return null
  }

  // Not a fan of ugly IF cascades
  let minimum = schema?.exclusiveMinimum || schema?.minimum
  let isExclusiveMinimum = schema?.exclusiveMinimum !== undefined
  let maximum = schema?.exclusiveMaximum || schema?.maximum
  let isExclusiveMaximum = schema?.exclusiveMaximum !== undefined
  const minAndMax = minimum !== undefined && maximum !== undefined

  return (
    <div key={"number-range"}>
      <strong>
        <Translate
          values={{
            id: "json-schema.labels.numberMinimumMaximum",
          }}
        >
          {"Possible values :"}
        </Translate>
      </strong>
      &nbsp;
      {minimum !== undefined && (
        <code>
          {isExclusiveMinimum === true ? (
            <Translate
              values={{
                id: "json-schema.keywords.minimumExlusive",
                count: minimum,
              }}
            >
              {"> {count}"}
            </Translate>
          ) : (
            <Translate
              values={{
                id: "json-schema.keywords.minimum",
                count: minimum,
              }}
            >
              {">= {count}"}
            </Translate>
          )}
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
      {maximum !== undefined && (
        <code>
          {isExclusiveMaximum === true ? (
            <Translate
              values={{
                id: "json-schema.keywords.maximumExlusive",
                count: maximum,
              }}
            >
              {"< {count}"}
            </Translate>
          ) : (
            <Translate
              values={{
                id: "json-schema.keywords.maximum",
                count: maximum,
              }}
            >
              {"<= {count}"}
            </Translate>
          )}
        </code>
      )}
    </div>
  )
}
