import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Translated label
function UnevaluatedPropertiesLabel(): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.labels.unevaluatedProperties",
        }}
      >
        {"property name*"}
      </Translate>
    </code>
  )
}

export default function CreateUnevaluatedProperties(props: Props): JSX.Element {
  const { schema } = props

  let unevaluatedProperties = schema.unevaluatedProperties

  // We don't have to care about that as it will be covered by QualifierMessages
  if (
    unevaluatedProperties === undefined ||
    typeof unevaluatedProperties === "boolean"
  ) {
    return <></>
  }

  return (
    <ul>
      <CreateEdge
        key={"object_unevaluatedProperties"}
        name={<UnevaluatedPropertiesLabel />}
        schema={unevaluatedProperties}
        required={false}
      />
    </ul>
  )
}
