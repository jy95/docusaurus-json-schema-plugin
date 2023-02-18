import React from "react"

import Translate from "@docusaurus/Translate"

import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "../../components/index"

import { IfLabel, ThenLabel } from "../../labels/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

function DependentSchemas(props: Props): JSX.Element {
  const { schema } = props

  let dependentSchemas = (schema as JSONSchemaNS.Object).dependentSchemas!

  let items = Object.entries(dependentSchemas).map(([property, subSchema]) => ({
    id: property,
    subSchema: subSchema,
    label: (
      <Translate
        values={{
          id: "json-schema.labels.dependentSchemas",
          ifProperty: property,
        }}
      >
        {"When {ifProperty} property is provided"}
      </Translate>
    ),
  }))

  return (
    <ul>
      {items.map((item) => (
        <Tabs key={item.id}>
          <TabItem key={"schema_if"} value={"schema_if"} label={<IfLabel />}>
            {item.label}
          </TabItem>
          <TabItem
            key={"schema_then"}
            value={"schema_then"}
            label={<ThenLabel />}
          >
            <CreateNodes schema={item.subSchema} />
          </TabItem>
        </Tabs>
      ))}
    </ul>
  )
}

export default DependentSchemas
