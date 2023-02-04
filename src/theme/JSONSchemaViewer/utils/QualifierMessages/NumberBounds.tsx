import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema } from "../../types"

type Props = {
  schema?: JSONSchema
}

// format minimum
function FormatMinimum({
  value,
  exclusive,
}: {
  value: number
  exclusive: boolean
}): JSX.Element {
  if (exclusive) {
    return (
      <Translate
        values={{
          id: "json-schema.keywords.minimumExlusive",
          count: value,
        }}
      >
        {"> {count}"}
      </Translate>
    )
  } else {
    return (
      <Translate
        values={{
          id: "json-schema.keywords.minimum",
          count: value,
        }}
      >
        {">= {count}"}
      </Translate>
    )
  }
}

// format maximum
function FormatMaximum({
  value,
  exclusive,
}: {
  value: number
  exclusive: boolean
}): JSX.Element {
  if (exclusive) {
    return (
      <Translate
        values={{
          id: "json-schema.keywords.maximumExlusive",
          count: value,
        }}
      >
        {"< {count}"}
      </Translate>
    )
  } else {
    return (
      <Translate
        values={{
          id: "json-schema.keywords.maximum",
          count: value,
        }}
      >
        {"<= {count}"}
      </Translate>
    )
  }
}

// And label
function AndLabel(): JSX.Element {
  return (
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
  )
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

  const boundsLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.numberMinimumMaximum",
        }}
      >
        {"Possible values :"}
      </Translate>
    </strong>
  )

  return (
    <div key={"number-range"}>
      {boundsLabel}
      &nbsp;
      {minimum !== undefined && (
        <code>
          <FormatMinimum exclusive={isExclusiveMinimum} value={minimum} />
        </code>
      )}
      {minAndMax && <AndLabel />}
      {maximum !== undefined && (
        <code>
          <FormatMaximum exclusive={isExclusiveMaximum} value={maximum} />
        </code>
      )}
    </div>
  )
}
