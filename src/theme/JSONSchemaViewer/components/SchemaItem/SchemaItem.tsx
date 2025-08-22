import React, { ReactNode } from "react"

import { Collapsible, CreateNodes } from "@theme/JSONSchemaViewer/components"
import { useSchemaHierarchyContext } from "@theme/JSONSchemaViewer/contexts"
import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts"

import {
  RequiredLabel,
  DeprecatedLabel,
  WriteOnlyLabel,
  ReadOnlyLabel,
  ConstantLabel,
} from "@theme/JSONSchemaViewer/labels"

import { GenerateFriendlyName } from "@theme/JSONSchemaViewer/utils"

import styles from "./styles.module.css"

import type { JSX } from "react"

import type {
  JSONSchema,
  JSONSchema_Draft_2019_09,
} from "@theme/JSONSchemaViewer/types"

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
  const { jsonPointer, level } = useSchemaHierarchyContext()
  const { defaultExpandDepth } = useJSVOptionsContext()

  // Determine if Collapsible should be open or closed by default
  const isOpenByDefault = level < (defaultExpandDepth ?? 0)

  // Notice : "deprecated" started at 2019-09
  let typedSchema = schema as JSONSchema_Draft_2019_09
  let isDeprecated =
    typeof typedSchema !== "boolean" && typedSchema.deprecated === true
  let isReadOnly =
    typeof typedSchema !== "boolean" && typedSchema.readOnly === true
  let isWriteOnly =
    typeof typedSchema !== "boolean" && typedSchema.writeOnly === true
  let isConstant =
    typeof typedSchema !== "boolean" &&
    (typedSchema.const !== undefined ||
      (Array.isArray(typedSchema.enum) && typedSchema.enum.length === 1))
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
      {isConstant && <>&nbsp;</>}
      {isConstant && <ConstantLabel />}
    </>
  )

  return (
    <li className={styles.schemaItem} id={jsonPointer} data-level={level}>
      <Collapsible
        summary={summary}
        detailsProps={{
          open: isOpenByDefault,
        }}
      >
        <>
          <CreateNodes schema={schema} />
        </>
      </Collapsible>
    </li>
  )
}
