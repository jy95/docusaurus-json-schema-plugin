import React, { ReactNode } from "react"
import Translate from "@docusaurus/Translate"
import type { JSONSchema7Definition } from "json-schema"

// The heart of the plugin : Display human friendly messages
function getQualifierMessages(
  schema?: JSONSchema7Definition
): ReactNode | undefined {
  if (schema === undefined || typeof schema === "boolean") {
    return undefined
  }

  let result: ReactNode[] = []

  // enum values
  if (schema?.enum !== undefined) {
    result.push(
      <p>
        <strong>
          <Translate
            values={{
              id: "docusaurus-json-schema-viewer-plugin.schema.enumLabel",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>
        {" ["}
        {schema.enum.map((value) => (
          <code>{value}</code>
        ))}
        {"]"}
      </p>
    )
  }

  // minLength / maxLength
  if (schema?.minLength !== undefined || schema?.maxLength !== undefined) {
    result.push(
      <p>
        <strong>
          <Translate
            values={{
              id: "docusaurus-json-schema-viewer-plugin.schema.lengthLabel",
            }}
          >
            {"Length :"}
          </Translate>
        </strong>
        {schema?.minLength !== undefined && (
          <code>
            <Translate
              values={{
                id: "docusaurus-json-schema-viewer-plugin.schema.minLength",
                count: schema.minLength,
              }}
            >
              {">= {count} character(s)"}
            </Translate>
          </code>
        )}
        {schema?.minLength !== undefined && schema?.maxLength !== undefined && (
          <>
            {" "}
            <Translate
              values={{
                id: "docusaurus-json-schema-viewer-plugin.schema.andLabel",
              }}
            >
              {"AND"}
            </Translate>{" "}
          </>
        )}
        {schema?.maxLength !== undefined && (
          <code>
            <Translate
              values={{
                id: "docusaurus-json-schema-viewer-plugin.schema.maxLength",
                count: schema.maxLength,
              }}
            >
              {"<= {count} character(s)"}
            </Translate>
          </code>
        )}
      </p>
    )
  }

  // minimum / exclusiveMinimum / maximum / exclusiveMaximum
  if (
    schema?.minimum !== undefined ||
    schema?.exclusiveMinimum !== undefined ||
    schema?.maximum !== undefined ||
    schema?.exclusiveMaximum !== undefined
  ) {
    // Not a fan of ugly IF cascades
    let minimum = schema?.exclusiveMinimum || schema?.minimum
    let isExclusiveMinimum = schema?.exclusiveMinimum !== undefined
    let maximum = schema?.exclusiveMaximum || schema?.maximum
    let isExclusiveMaximum = schema?.exclusiveMaximum !== undefined

    // TODO
    result.push(
      <p>
        <strong>
          <Translate
            values={{
              id: "docusaurus-json-schema-viewer-plugin.schema.numberMinimumMaximumLabel",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>
      </p>
    )
  }

  // Default value
  if (schema?.default !== undefined) {
    result.push(
      <p>
        <strong>
          <Translate
            values={{
              id: "docusaurus-json-schema-viewer-plugin.schema.defaultLabel",
            }}
          >
            {"Default value :"}
          </Translate>
        </strong>
        <code>{schema.default}</code>
      </p>
    )
  }

  // Const value
  if (schema?.const !== undefined) {
    result.push(
      <p>
        <strong>
          <Translate
            values={{
              id: "docusaurus-json-schema-viewer-plugin.schema.constLabel",
            }}
          >
            {"Constant value :"}
          </Translate>
        </strong>
        <code>{schema.const}</code>
      </p>
    )
  }

  if (result.length === 0) {
    return undefined
  } else {
    return result
  }
}

export default getQualifierMessages
