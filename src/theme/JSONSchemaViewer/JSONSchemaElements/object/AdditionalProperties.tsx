import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

function createAdditionalProperties(props: Props): JSX.Element {
  const { schema } = props

  if (typeof schema === "boolean") {
    return <></>
  }

  let typedSchema = schema.additionalProperties!

  // don't want to display something in boolean cases, at least from now ...
  if (typeof typedSchema === "boolean") {
    return <></>
  }

  let types = Array.isArray(typedSchema?.type)
    ? typedSchema?.type
    : typedSchema?.type !== undefined
    ? [typedSchema?.type]
    : []
  // Usually, we have only "type" in the payload : https://json-schema.org/understanding-json-schema/reference/object.html#additional-properties

  if (types.length > 0) {
    // Most of the time, only one entry but prefer to be safe that sorry ...

    const additionalPropertiesLabel = (
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

    return (
      <CreateEdge
        key={"object_additionalProperties"}
        name={additionalPropertiesLabel}
        schema={typedSchema}
        required={false}
      />
    )
  } else {
    // Well well, at this point we could have anything so let createNodes do the job
    return <></>
  }
}

export default createAdditionalProperties
