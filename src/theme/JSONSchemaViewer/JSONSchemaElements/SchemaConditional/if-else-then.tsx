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
  if (typeof schema === "boolean") {
    return <></>
  }

  const hasThen = schema.then !== undefined
  const hasElse = schema.else !== undefined

  return (
    <Tabs>
      <TabItem
        key={"schema_if"}
        value={"schema_if"}
        label={
          <strong>
            <Translate
              values={{
                id: "json-schema.keywords.if",
              }}
            >
              {"If"}
            </Translate>
          </strong>
        }
      >
        <CreateNodes schema={schema.if!} />
      </TabItem>
      {hasThen && (
        <TabItem
          key={"schema_then"}
          value={"schema_then"}
          label={
            <strong>
              <Translate
                values={{
                  id: "json-schema.keywords.then",
                }}
              >
                {"Then"}
              </Translate>
            </strong>
          }
        >
          <CreateNodes schema={schema.then!} />
        </TabItem>
      )}
      {hasElse && (
        <TabItem
          key={"schema_else"}
          value={"schema_else"}
          label={
            <strong>
              <Translate
                values={{
                  id: "json-schema.keywords.else",
                }}
              >
                {"Else"}
              </Translate>
            </strong>
          }
        >
          <CreateNodes schema={schema.else!} />
        </TabItem>
      )}
    </Tabs>
  )
}

export default IfElseThen
