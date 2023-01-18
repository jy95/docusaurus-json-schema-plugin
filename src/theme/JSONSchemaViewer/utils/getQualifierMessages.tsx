import React, { Fragment } from "react"

import Translate from "@docusaurus/Translate"
import CodeBlock from "@theme-original/CodeBlock"

import type { JSONSchema7Definition, JSONSchema7Type } from "json-schema"

// To print all JSONSchema7Type
function printSchemaType(obj: JSONSchema7Type): JSX.Element {
  // deal with simple types first
  if (["string", "number", "bigint", "boolean"].includes(typeof obj)) {
    return <code>{obj}</code>
  }

  // if it is a object / array, it is likely to be complex so time for my ace card
  return <CodeBlock language="json">{`${JSON.stringify(obj)}`}</CodeBlock>
}

type Props = {
  schema?: JSONSchema7Definition
}

// In order to detect if it is empty, I use a "empty" key
export const EMPTY_KEY = "empty"

// The heart of the plugin : Display human friendly messages
function QualifierMessages(props: Props): JSX.Element {
  const { schema } = props

  if (schema === undefined || typeof schema === "boolean") {
    return <Fragment key={EMPTY_KEY} />
  }

  let result: JSX.Element[] = []

  // enum values
  if (schema?.enum !== undefined) {
    result.push(
      <p key={"enum"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.enum",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>&nbsp;
        {printSchemaType(schema.enum)}
      </p>
    )
  }

  // minLength / maxLength
  if (schema?.minLength !== undefined || schema?.maxLength !== undefined) {
    let minAndMaxLength =
      schema?.minLength !== undefined && schema?.maxLength !== undefined

    result.push(
      <p
        key={
          minAndMaxLength
            ? "minLengthAndmaxLength"
            : schema?.minLength !== undefined
            ? "minLength"
            : "maxLength"
        }
      >
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.length",
            }}
          >
            {"Length :"}
          </Translate>
        </strong>&nbsp;
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
        {minAndMaxLength && (
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

  // minProperties / maxProperties
  if (
    schema?.minProperties !== undefined ||
    schema?.maxProperties !== undefined
  ) {
    let minAndMax =
      schema?.minProperties !== undefined && schema?.maxProperties !== undefined

    result.push(
      <p
        key={
          minAndMax
            ? "minPropertiesAndMaxProperties"
            : schema?.minProperties !== undefined
            ? "minProperties"
            : "maxProperties"
        }
      >
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.lengthProperties",
            }}
          >
            {"Length :"}
          </Translate>
        </strong>&nbsp;
        {schema?.minProperties !== undefined && (
          <code>
            <Translate
              values={{
                id: "json-schema.keywords.minProperties",
                count: schema.minProperties,
              }}
            >
              {">= {count} propertie(s)"}
            </Translate>
          </code>
        )}
        {minAndMax && (
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
        {schema?.maxProperties !== undefined && (
          <code>
            <Translate
              values={{
                id: "json-schema.keywords.maxProperties",
                count: schema.maxProperties,
              }}
            >
              {"<= {count} propertie(s)"}
            </Translate>
          </code>
        )}
      </p>
    )
  }

  // minItems / maxItems
  if (schema?.minItems !== undefined || schema?.maxItems !== undefined) {
    let minAndMax =
      schema?.minItems !== undefined && schema?.maxItems !== undefined

    result.push(
      <p
        key={
          minAndMax
            ? "minItemsAndmaxItems"
            : schema?.minItems !== undefined
            ? "minItems"
            : "maxItems"
        }
      >
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.lengthItems",
            }}
          >
            {"Length :"}
          </Translate>
        </strong>&nbsp;
        {schema?.minItems !== undefined && (
          <code>
            <Translate
              values={{
                id: "json-schema.keywords.minItems",
                count: schema.minItems,
              }}
            >
              {">= {count}"}
            </Translate>
          </code>
        )}
        {minAndMax && (
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
        {schema?.maxItems !== undefined && (
          <code>
            <Translate
              values={{
                id: "json-schema.keywords.maxItems",
                count: schema.maxItems,
              }}
            >
              {"<= {count}"}
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
    const minAndMax = minimum !== undefined && maximum !== undefined

    result.push(
      <p key={"number-range"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.numberMinimumMaximum",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>&nbsp;
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
        {minAndMax && (
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

  // pattern
  if (schema?.pattern !== undefined) {
    result.push(
      <p key={"pattern"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.pattern",
            }}
          >
            {"Pattern :"}
          </Translate>
        </strong>&nbsp;
        <code>{schema.pattern}</code>
      </p>
    )
  }

  // multipleOf
  if (schema?.multipleOf !== undefined) {
    result.push(
      <p key={"multipleOf"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.multipleOf",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>&nbsp;
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

  // uniqueItems
  if (schema?.uniqueItems !== undefined && schema.uniqueItems === true) {
    result.push(
      <p key={"uniqueItems"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.uniqueItems",
            }}
          >
            {"Unique items :"}
          </Translate>
        </strong>&nbsp;
        <code>
          <Translate
            values={{
              id: "json-schema.labels.uniqueItemsOnly",
            }}
          >
            {"yes"}
          </Translate>
        </code>
      </p>
    )
  }

  // Default value
  if (schema?.default !== undefined) {
    result.push(
      <p key={"default"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.default",
            }}
          >
            {"Default value :"}
          </Translate>
        </strong>&nbsp;
        {printSchemaType(schema.default)}
      </p>
    )
  }

  // Const value
  if (schema?.const !== undefined) {
    result.push(
      <p key={"const"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.const",
            }}
          >
            {"Constant value :"}
          </Translate>
        </strong>&nbsp;
        {printSchemaType(schema.const)}
      </p>
    )
  }

  return (
    <Fragment key={result.length > 0 ? "not-empty" : EMPTY_KEY}>
      {result}
    </Fragment>
  )
}

export default QualifierMessages
