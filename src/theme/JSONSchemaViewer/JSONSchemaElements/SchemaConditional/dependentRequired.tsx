import React from "react"

import Translate from "@docusaurus/Translate"

import type { JSONSchema, JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

function DependentRequired(props: Props): JSX.Element {
  const { schema } = props

  // Fast fail
  if (typeof schema === "boolean") {
    return <></>
  }

  let dependentRequired = (schema as JSONSchemaNS.Object).dependentRequired!

  let items = Object.entries(dependentRequired).map(
    ([property1, property2]) => ({
      id: property1,
      label: (
        <Translate
          values={{
            id: "json-schema.labels.dependentRequired",
            ifProperty: property1,
            count: property2.length,
            otherProperty: property2.join(" "),
          }}
        >
          {
            "If {ifProperty} property is provided, then {count} propertie(s) must also be present: {otherProperty}"
          }
        </Translate>
      ),
    })
  )

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  )
}

export default DependentRequired
