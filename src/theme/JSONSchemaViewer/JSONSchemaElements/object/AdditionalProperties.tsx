import React from "react"
import Translate from "@docusaurus/Translate"

import { CreateEdge } from "@theme/JSONSchemaViewer/components"
import { SchemaHierarchyComponent } from "@theme/JSONSchemaViewer/contexts"

import type { JSX } from "react"
import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

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

export default function CreateAdditionalProperties(props: Props): JSX.Element {
  const { schema } = props

  let additionalProperties = schema.additionalProperties

  // We don't have to care about that as it will be covered by QualifierMessages
  if (
    additionalProperties === undefined ||
    typeof additionalProperties === "boolean"
  ) {
    return <></>
  }

  return (
    <ul>
      <SchemaHierarchyComponent innerJsonPointer="/additionalProperties">
        <CreateEdge
          key={"object_additionalProperties"}
          name={<AdditionalPropertiesLabel />}
          schema={additionalProperties}
          required={false}
        />
      </SchemaHierarchyComponent>
    </ul>
  )
}
