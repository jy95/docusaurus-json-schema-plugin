import React from "react"

import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "@theme/JSONSchemaViewer/components"
import {
  SchemaHierarchyContextProvider,
  useSchemaHierarchyContext,
} from "@theme/JSONSchemaViewer/contexts"

import { IfLabel, ThenLabel, ElseLabel } from "@theme/JSONSchemaViewer/labels"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

// Handle if else then
export default function IfElseThen(props: Props): JSX.Element {
  const { jsonPointer: currentJsonPointer, level: currentLevel } =
    useSchemaHierarchyContext()
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
    schema: Exclude<JSONSchema, true | false>,
  ) {
    switch (value) {
      case "schema_if":
        return (
          <SchemaHierarchyContextProvider
            value={{
              level: currentLevel + 1,
              jsonPointer: `${currentJsonPointer}/if`,
            }}
          >
            <CreateNodes schema={schema.if!} />
          </SchemaHierarchyContextProvider>
        )
      case "schema_then":
        return (
          <SchemaHierarchyContextProvider
            value={{
              level: currentLevel + 1,
              jsonPointer: `${currentJsonPointer}/then`,
            }}
          >
            <CreateNodes schema={schema.then!} />
          </SchemaHierarchyContextProvider>
        )
      case "schema_else":
        return (
          <SchemaHierarchyContextProvider
            value={{
              level: currentLevel + 1,
              jsonPointer: `${currentJsonPointer}/else`,
            }}
          >
            <CreateNodes schema={schema.else!} />
          </SchemaHierarchyContextProvider>
        )
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
