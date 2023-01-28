import React, { ReactNode } from "react"
import Translate from "@docusaurus/Translate"

import { Collapsible, CreateNodes } from "../index"
import styles from "./styles.module.css"

import type { JSONSchema, JSONSchema_Draft_2019_09 } from "../../types"

type SchemaItemProps = {
  // name of the item (with styles when needed)
  name: ReactNode
  // From generateFriendlyName function
  schemaName: string
  // Our schema
  schema: JSONSchema
  // Is it required
  required: boolean
}

function SchemaItem({
  schema,
  name,
  schemaName,
  required,
}: SchemaItemProps): JSX.Element {
  // Notice : "deprecated" started at Draft 8 (2019-09)
  let typedSchema = schema as JSONSchema_Draft_2019_09
  let isDeprecated =
    typeof typedSchema !== "boolean" && typedSchema?.deprecated === true

  // Header
  const summary = (
    <>
      {name}&nbsp;
      <span className={styles.schemaName}>{schemaName}</span>&nbsp;
      {!isDeprecated && required && (
        <strong className={styles.required}>
          <Translate
            values={{
              id: "json-schema.keywords.required",
            }}
          >
            {"required"}
          </Translate>
        </strong>
      )}
      {isDeprecated && (
        <strong className={styles.deprecated}>
          <Translate
            values={{
              id: "json-schema.keywords.deprecated",
            }}
          >
            {"deprecated"}
          </Translate>
        </strong>
      )}
    </>
  )

  return (
    <li className={styles.schemaItem}>
      <Collapsible
        summary={summary}
        detailsProps={{
          open: false,
        }}
      >
        <>
          <CreateNodes schema={schema} />
        </>
      </Collapsible>
    </li>
  )
}

export default SchemaItem
