import React from "react"

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

// The heart of the plugin : Display human friendly messages
function QualifierMessages(props: Props): null | JSX.Element {
  const { schema } = props

  if (schema === undefined || typeof schema === "boolean") {
    return null
  }

  let result: JSX.Element[] = []

  // enum values
  if (schema?.enum !== undefined) {
    result.push(
      <div key={"enum"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.enum",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>
        &nbsp;
        {printSchemaType(schema.enum)}
      </div>
    )
  }

  // minLength / maxLength
  if (schema?.minLength !== undefined || schema?.maxLength !== undefined) {
    let minAndMaxLength =
      schema?.minLength !== undefined && schema?.maxLength !== undefined

    result.push(
      <div
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
        </strong>
        &nbsp;
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
      </div>
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
      <div
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
        </strong>
        &nbsp;
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
      </div>
    )
  }

  // minItems / maxItems
  if (schema?.minItems !== undefined || schema?.maxItems !== undefined) {
    let minAndMax =
      schema?.minItems !== undefined && schema?.maxItems !== undefined

    result.push(
      <div
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
        </strong>
        &nbsp;
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
      </div>
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
      <div key={"number-range"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.numberMinimumMaximum",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>
        &nbsp;
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
      </div>
    )
  }

  // pattern
  if (schema?.pattern !== undefined) {
    result.push(
      <div key={"pattern"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.pattern",
            }}
          >
            {"Pattern :"}
          </Translate>
        </strong>
        &nbsp;
        <code>{schema.pattern}</code>
      </div>
    )
  }

  // multipleOf
  if (schema?.multipleOf !== undefined) {
    result.push(
      <div key={"multipleOf"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.multipleOf",
            }}
          >
            {"Possible values :"}
          </Translate>
        </strong>
        &nbsp;
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
      </div>
    )
  }

  // uniqueItems
  if (schema?.uniqueItems !== undefined && schema.uniqueItems === true) {
    result.push(
      <div key={"uniqueItems"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.uniqueItems",
            }}
          >
            {"Unique items :"}
          </Translate>
        </strong>
        &nbsp;
        <code>
          <Translate
            values={{
              id: "json-schema.labels.uniqueItemsOnly",
            }}
          >
            {"yes"}
          </Translate>
        </code>
      </div>
    )
  }

  // Default value
  if (schema?.default !== undefined) {
    result.push(
      <div key={"default"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.default",
            }}
          >
            {"Default value :"}
          </Translate>
        </strong>
        &nbsp;
        {printSchemaType(schema.default)}
      </div>
    )
  }

  // Const value
  if (schema?.const !== undefined) {
    result.push(
      <div key={"const"}>
        <strong>
          <Translate
            values={{
              id: "json-schema.labels.const",
            }}
          >
            {"Constant value :"}
          </Translate>
        </strong>
        &nbsp;
        {printSchemaType(schema.const)}
      </div>
    )
  }

  if (result.length === 0) {
    return null
  } else {
    return <>{result}</>
  }
}

export default QualifierMessages
