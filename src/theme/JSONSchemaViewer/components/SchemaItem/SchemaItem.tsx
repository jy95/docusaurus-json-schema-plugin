import React, { ReactNode } from "react"
import Translate from "@docusaurus/Translate"

import styles from "./styles.module.css"

import type { JSONSchema7 } from "json-schema"

type SchemaItemProps = {
  children?: ReactNode
  // Is children collapsible ?
  collapsible: boolean
  // name of the item
  name: string
  // From generateFriendlyName function
  schemaName?: string
  // Our schema
  schema: JSONSchema7
}

function SchemaItem({
  schema,
  collapsible,
  name,
  schemaName,
  children,
}: SchemaItemProps): JSX.Element {
  // @ts-ignore "deprecated" started at Draft 8 (2019-09) but many tools converting from OAS to JSON schema put that as fallback
  // https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.9.3
  let isDeprecated = schema?.deprecated === true

  let isRequired = Array.isArray(schema?.required)
    ? schema.required.includes(name)
    : false

  // If not collapsible, we must generate a item by ourself
  const alternativeChildren = !collapsible && (
    <div>
      <span className={styles.schemaName}> {schemaName}</span>
      {!isDeprecated && isRequired && (
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
    </div>
  )

  return (
    <li className={styles.schemaItem}>
      {collapsible ? children : alternativeChildren}
    </li>
  )
}

export default SchemaItem
