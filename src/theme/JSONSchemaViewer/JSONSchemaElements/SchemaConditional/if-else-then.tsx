import React from "react"

import Translate from "@docusaurus/Translate"

import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

// Handle if else then
function IfElseThen(props: Props): JSX.Element {
  const { schema } = props

  // Fast fail
  /* istanbul ignore if  */
  if (typeof schema === "boolean") {
    return <></>
  }

  const hasThen = schema.then !== undefined
  const hasElse = schema.else !== undefined

  // Translated labels
  const ifLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.if",
        }}
      >
        {"If"}
      </Translate>
    </strong>
  )

  const thenLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.then",
        }}
      >
        {"Then"}
      </Translate>
    </strong>
  )

  const elseLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.keywords.else",
        }}
      >
        {"Else"}
      </Translate>
    </strong>
  )

  // values for Tabs
  let values = [
    {
      value: "schema_if",
      label: ifLabel,
    },
    hasThen && {
      value: "schema_then",
      label: thenLabel,
    },
    hasElse && {
      value: "schema_else",
      label: elseLabel,
    },
  ].filter((v) => typeof v !== "boolean") as {
    value: "schema_if" | "schema_then" | "schema_else"
    label: JSX.Element
  }[]

  // Render appropriate case
  function renderSwitch(
    value: "schema_if" | "schema_then" | "schema_else",
    schema: JSONSchema
  ) {
    // fast fallback
    /* istanbul ignore if  */
    if (typeof schema === "boolean") {
      return <></>
    }

    switch (value) {
      case "schema_if":
        return <CreateNodes schema={schema.if!} />
      case "schema_then":
        return <CreateNodes schema={schema.then!} />
      case "schema_else":
        return <CreateNodes schema={schema.else!} />
      /* istanbul ignore next */
      default:
        return <></>
    }
  }

  return (
    <Tabs defaultValue="schema_if" values={values}>
      {values.map((val) => (
        <TabItem value={val.value} key={val.value}>
          {renderSwitch(val.value, schema)}
        </TabItem>
      ))}
    </Tabs>
  )
}

export default IfElseThen
