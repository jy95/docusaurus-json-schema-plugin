import React, { ReactNode } from "react"
import Translate from "@docusaurus/Translate"

import { Collapsible, CreateNodes } from "../index";
import { QUALIFIER_MESSAGES_EMPTY_KEY, QualifierMessages } from "../../utils/index";
import styles from "./styles.module.css"

import type { JSONSchema7 } from "json-schema"

type SchemaItemProps = {
  // name of the item (with styles when needed)
  name: ReactNode
  // From generateFriendlyName function
  schemaName: string
  // Our schema
  schema: JSONSchema7
  // Is it required
  required: boolean
}

function SchemaItem({
  schema,
  name,
  schemaName,
  required
}: SchemaItemProps): JSX.Element {
  // @ts-ignore "deprecated" started at Draft 8 (2019-09) but many tools converting from OAS to JSON schema put that as fallback
  // https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.9.3
  let isDeprecated = schema?.deprecated === true

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

  // qualifier
  let qualifierMessages = <QualifierMessages />

  return (
    <li className={styles.schemaItem}>
      <Collapsible 
        summary={summary}
        detailsProps={{
          open: false
        }}
      >
        <>
          {
            (qualifierMessages.key !== QUALIFIER_MESSAGES_EMPTY_KEY) && <div>{qualifierMessages}</div>
          }
          <CreateNodes schema={schema} />
        </>
      </Collapsible>
    </li>
  )
}

export default SchemaItem
