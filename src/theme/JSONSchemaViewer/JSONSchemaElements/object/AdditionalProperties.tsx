import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
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

export default function CreateAdditionalProperties(props: Props): JSX.Element {
  const { schema } = props

  // Because of the previous check : "typeof schema.additionalProperties !== "boolean""
  // We don't have to care about that as it will be covered by QualifierMessages
  /* istanbul ignore if  */
  if (typeof schema === "boolean") {
    return <></>
  }

  let typedSchema = schema.additionalProperties!

  // don't want to display something in boolean cases, at least from now ...
  if (typeof typedSchema === "boolean") {
    return <></>
  }

  return (
    <CreateEdge
      key={"object_additionalProperties"}
      name={<AdditionalPropertiesLabel />}
      schema={typedSchema}
      required={false}
    />
  )
}
