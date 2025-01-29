import React from "react"
import Translate from "@docusaurus/Translate"

import { TypeLabel, TrueLabel } from "@theme/JSONSchemaViewer/labels"
import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts"
import { QualifierMessages } from "@theme/JSONSchemaViewer/utils"
import { CreateDescription } from "@theme/JSONSchemaViewer/JSONSchemaElements"

import type { JSX } from "react"
import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  [x: string]: any
  schema: JSONSchema
}

// When schema has the value "true" or empty object, it means that it is ALWAYS valid
export default function CreateAlwaysValid({ schema }: Props): JSX.Element {
  const options = useJSVOptionsContext()
  const notBoolean = typeof schema !== "boolean"
  const description = notBoolean ? schema.description : undefined

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <TrueLabel />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <Translate
          values={{
            id: "json-schema.labels.true",
          }}
        >
          {"Always valid"}
        </Translate>
      </div>
      {notBoolean && (
        <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
          <QualifierMessages schema={schema} options={options} />
        </div>
      )}
      {description !== undefined && (
        <CreateDescription description={description} />
      )}
    </>
  )
}
