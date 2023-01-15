import React from "react"
import Translate from "@docusaurus/Translate"

import { Collapsible, CreateNodes, SchemaItem } from "./index"
import { getQualifierMessages } from "../utils"

import type { JSONSchema7 } from "json-schema"

type Props = {
  name: string
  schemaName: string
  schema: JSONSchema7
  required: boolean | string[]
  [x: string]: any
}

function createDetailsNode(props: Props): JSX.Element {
  const { name, required, schema, schemaName } = props

  const isRequired = Array.isArray(required)
    ? required.includes(name)
    : required

  let qualifierMessages = getQualifierMessages(schema)

  return (
    <SchemaItem collapsible={true} schema={schema} name={name}>
      <Collapsible
        summary={
          <div>
            <strong>{name}</strong>
            <span style={{ opacity: "0.6" }}>{schemaName}</span>
            {isRequired && (
              <strong
                style={{
                  fontSize: "var(--ifm-code-font-size)",
                  color: "var(--ifm-color-danger)",
                }}
              >
                <Translate
                  values={{
                    id: "json-schema.keywords.required",
                  }}
                >
                  {"required"}
                </Translate>
              </strong>
            )}
          </div>
        }
        children={
          <div style={{ marginLeft: "1rem" }}>
            {qualifierMessages !== undefined && (
              <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                {qualifierMessages}
              </div>
            )}
            {schema?.description !== undefined && (
              <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                {schema?.description}
              </div>
            )}
            <CreateNodes schema={schema} />
          </div>
        }
      />
    </SchemaItem>
  )
}

export default createDetailsNode
