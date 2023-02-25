import React from "react"

import Translate from "@docusaurus/Translate"

import { Collapsible, CreateNodes } from "../../components/index"

import type { JSONSchemaNS } from "../../types"

type Props = {
  schema: JSONSchemaNS.String
}

export default function ContentSchema(props: Props): JSX.Element {
  const { schema } = props

  // Translated Labels
  const contentSchemaLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.contentSchema",
        }}
      >
        {"Decoded content must be validated against this schema :"}
      </Translate>
    </strong>
  )

  // TODO maybe later refactor this name ...
  const title = "Schema"

  return (
    <div key={"contentSchema"}>
      {contentSchemaLabel}
      &nbsp;
      <Collapsible
        summary={<strong>{title}</strong>}
        detailsProps={{
          open: true,
        }}
      >
        <CreateNodes schema={schema.contentSchema!} />
      </Collapsible>
    </div>
  )
}
