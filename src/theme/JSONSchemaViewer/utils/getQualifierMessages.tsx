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
              id: "json-schema.labels.enum",
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
              id: "json-schema.labels.length",
            }}
          >
            {"Length :"}
          </Translate>
        </strong>
        {schema?.minLength !== undefined && (
          <code>
            <Translate
              values={{
                id: "json-schema.keywords.minLength",
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
                id: "json-schema.labels.and",
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
                id: "json-schema.keywords.maxLength",
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

    result.push(
      <p>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.numberMinimumMaximum",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>
        {minimum !== undefined && (
          <code>
            {isExclusiveMinimum === true ? (
              <Translate
                values={{
                  id: "json-schema.keywords.minimumExlusive",
                  count: minimum,
                }}
              >
                {"> {count}"}
              </Translate>
            ) : (
              <Translate
                values={{
                  id: "json-schema.keywords.minimum",
                  count: minimum,
                }}
              >
                {">= {count}"}
              </Translate>
            )}
          </code>
        )}
        {minimum !== undefined && maximum !== undefined && (
          <>
            {" "}
            <Translate
              values={{
                id: "json-schema.labels.and",
              }}
            >
              {"AND"}
            </Translate>{" "}
          </>
        )}
        {maximum !== undefined && (
          <code>
            {isExclusiveMaximum === true ? (
              <Translate
                values={{
                  id: "json-schema.keywords.maximumExlusive",
                  count: maximum,
                }}
              >
                {"< {count}"}
              </Translate>
            ) : (
              <Translate
                values={{
                  id: "json-schema.keywords.maximum",
                  count: maximum,
                }}
              >
                {"<= {count}"}
              </Translate>
            )}
          </code>
        )}
      </p>
    )
  }

  // multipleOf
  if (schema?.multipleOf !== undefined) {
    result.push(
      <p>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.multipleOf",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>
        <code>
          <Translate
            values={{
              id: "json-schema.keywords.multipleOf",
              count: schema.multipleOf,
            }}
          >
            {"multiple of {count}"}
          </Translate>  
        </code>
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
              id: "json-schema.labels.default",
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
              id: "json-schema.labels.const",
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
