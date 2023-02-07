import React from "react"

import Translate from "@docusaurus/Translate"

import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "../../components/index"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

function DependentSchemas(props: Props): JSX.Element {
  const { schema } = props

  // Fast fail
  if (typeof schema === "boolean") {
    return <></>
  }

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

  const elseLabel = (
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

  return (
    <ul>
      {items.map((item) => (
        <Tabs key={item.id}>
          <TabItem key={"schema_if"} value={"schema_if"} label={ifLabel}>
            {item.label}
          </TabItem>
          <TabItem key={"schema_then"} value={"schema_then"} label={elseLabel}>
            <CreateNodes schema={item.subSchema} />
          </TabItem>
        </Tabs>
      ))}
    </ul>
  )
}

export default DependentSchemas
