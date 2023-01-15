import React from "react"
import Translate from "@docusaurus/Translate"

import { getQualifierMessages } from "../utils/index"
import { CreateNodes } from "../components/index"

import type {
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7TypeName,
} from "json-schema"

import type { WithRequired } from "./index"

type Props = {
  schema: WithRequired<JSONSchema7, "additionalProperties">
  [x: string]: any
}

function createAdditionalProperties(props: Props): JSX.Element {
  const { schema } = props
  let typedSchema = schema.additionalProperties as JSONSchema7Definition

  // don't want to display something in boolean cases, at least from now ...
  if (typeof typedSchema === "boolean") {
    return <></>
  }

  let types = (
    Array.isArray(typedSchema?.type) ? typedSchema?.type : [typedSchema?.type]
  ).filter((s) => s !== undefined) as JSONSchema7TypeName[]

  // Usually, we have only "type" in the payload : https://json-schema.org/understanding-json-schema/reference/object.html#additional-properties

  if (types.length > 0) {
    // Most of the time, only one entry but prefer to be safe that sorry ...
    let typesAsString = types.join(" OR ")
    let qualifierMessages = getQualifierMessages(typedSchema)

    return (
      <li>
        <div>
          <code>
            <Translate
              values={{
                id: "json-schema.labels.additionalProperties",
              }}
            >
              {"property name*"}
            </Translate>
          </code>
          <span style={{ opacity: "0.6" }}>{` ${typesAsString}`}</span>
          {typedSchema?.format !== undefined && (
            <span style={{ opacity: "0.6" }}>{` ${typedSchema.format}`}</span>
          )}
          {qualifierMessages !== undefined && (
            <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
              {qualifierMessages}
            </div>
          )}
        </div>
      </li>
    )
  } else {
    // Well well, at this point we could have anything so let createNodes do the job
    return <CreateNodes schema={schema} />
  }
}

export default createAdditionalProperties
