import React from "react"
import Translate from "@docusaurus/Translate"

import {
  QualifierMessages,
  QUALIFIER_MESSAGES_EMPTY_KEY,
} from "../../utils/index"

import type { JSONSchema7 } from "json-schema"

type Props = {
  schema: JSONSchema7
  [x: string]: any
}

function createAdditionalProperties(props: Props): JSX.Element {
  const { schema } = props
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
    let typesAsString = types.join(" OR ")
    let qualifierMessages = <QualifierMessages schema={typedSchema} />

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
          {qualifierMessages.key !== QUALIFIER_MESSAGES_EMPTY_KEY && (
            <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
              {qualifierMessages}
            </div>
          )}
        </div>
      </li>
    )
  } else {
    // Well well, at this point we could have anything so let createNodes do the job
    return <></>
  }
}

export default createAdditionalProperties
