import React from "react"

import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "@theme/JSONSchemaViewer/components/index"

import {
  IfLabel,
  ThenLabel,
  ElseLabel,
} from "@theme/JSONSchemaViewer/labels/index"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

// Handle if else then
export default function IfElseThen(props: Props): JSX.Element {
  const { schema } = props

  const hasThen = schema.then !== undefined
  const hasElse = schema.else !== undefined

  // values for Tabs
  let values = [
    {
      value: "schema_if",
      label: <IfLabel />,
    },
    hasThen && {
      value: "schema_then",
      label: <ThenLabel />,
    },
    hasElse && {
      value: "schema_else",
      label: <ElseLabel />,
    },
  ].filter((v) => typeof v !== "boolean") as {
    value: "schema_if" | "schema_then" | "schema_else"
    label: JSX.Element
  }[]

  // Render appropriate case
  function renderSwitch(
    value: "schema_if" | "schema_then" | "schema_else",
    schema: Exclude<JSONSchema, true | false>
  ) {
    switch (value) {
      case "schema_if":
        return <CreateNodes schema={schema.if!} />
      case "schema_then":
        return <CreateNodes schema={schema.then!} />
      case "schema_else":
        return <CreateNodes schema={schema.else!} />
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
