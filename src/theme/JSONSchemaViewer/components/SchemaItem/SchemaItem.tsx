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

// Translated labels
function RequiredLabel(): JSX.Element {
  return (
    <strong className={styles.required}>
      <Translate
        values={{
          id: "json-schema.keywords.required",
        }}
      >
        {"required"}
      </Translate>
    </strong>
  )
}

function DeprecatedLabel(): JSX.Element {
  return (
    <strong className={styles.deprecated}>
      <Translate
        values={{
          id: "json-schema.keywords.deprecated",
        }}
      >
        {"deprecated"}
      </Translate>
    </strong>
  )
}

function ReadOnlyLabel(): JSX.Element {
  return (
    <strong className={styles.readOnly}>
      <Translate
        values={{
          id: "json-schema.keywords.readOnly",
        }}
      >
        {"readOnly"}
      </Translate>
    </strong>
  )
}

function WriteOnlyLabel(): JSX.Element {
  return (
    <strong className={styles.writeOnly}>
      <Translate
        values={{
          id: "json-schema.keywords.writeOnly",
        }}
      >
        {"writeOnly"}
      </Translate>
    </strong>
  )
}

function SchemaItem({
  schema,
  name,
  schemaName,
  required,
}: SchemaItemProps): JSX.Element {
  // Notice : "deprecated" started at 2019-09
  let typedSchema = schema as JSONSchema_Draft_2019_09
  let isDeprecated =
    typeof typedSchema !== "boolean" && typedSchema.deprecated === true
  let isReadOnly =
    typeof typedSchema !== "boolean" && typedSchema.readOnly === true
  let isWriteOnly =
    typeof typedSchema !== "boolean" && typedSchema.writeOnly === true
  let isRequired = !isDeprecated && required

  // Header
  const summary = (
    <>
      {name}&nbsp;
      <span className={styles.schemaName}>{schemaName}</span>
      {isRequired && <>&nbsp;</>}
      {isRequired && <RequiredLabel />}
      {isDeprecated && <>&nbsp;</>}
      {isDeprecated && <DeprecatedLabel />}
      {isReadOnly && <>&nbsp;</>}
      {isReadOnly && <ReadOnlyLabel />}
      {isWriteOnly && <>&nbsp;</>}
      {isWriteOnly && <WriteOnlyLabel />}
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
