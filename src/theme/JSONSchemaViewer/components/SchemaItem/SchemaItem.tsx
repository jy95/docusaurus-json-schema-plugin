import React, { ReactNode } from "react"

import { Collapsible, CreateNodes } from "../index"

import {
  RequiredLabel,
  DeprecatedLabel,
  WriteOnlyLabel,
  ReadOnlyLabel,
} from "../../labels/index"

import { GenerateFriendlyName } from "../../utils/index"

import styles from "./styles.module.css"

import type { JSONSchema, JSONSchema_Draft_2019_09 } from "../../types"

type SchemaItemProps = {
  // name of the item (with styles when needed)
  name: ReactNode
  // Our schema
  schema: JSONSchema
  // Is it required
  required: boolean
}

export default function SchemaItem({
  schema,
  name,
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
      <GenerateFriendlyName schema={schema} />
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
