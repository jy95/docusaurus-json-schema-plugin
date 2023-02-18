import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.Object
  [x: string]: any
}

// Translated label
function AdditionalPropertiesLabel(): JSX.Element {
  return (
    <code>
      <Translate
        values={{
          id: "json-schema.labels.additionalProperties",
        }}
      >
        {"property name*"}
      </Translate>
    </code>
  )
}

// Because of the previous check : "typeof schema.additionalProperties !== "boolean""
// We don't have to care about that as it will be covered by QualifierMessages
export default function CreateAdditionalProperties(props: Props): JSX.Element {
  const { schema } = props

  let additionalProperties = schema.additionalProperties

  if (additionalProperties === undefined) {
    return <></>
  }

  return (
    <ul>
      <CreateEdge
        key={"object_additionalProperties"}
        name={<AdditionalPropertiesLabel />}
        schema={additionalProperties}
        required={false}
      />
    </ul>
  )
}
