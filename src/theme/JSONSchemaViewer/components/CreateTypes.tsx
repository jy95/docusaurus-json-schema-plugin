import React from "react"

import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import {
  TypeLabelSwitch,
  RenderProvidedType,
  CreateValidOrInvalid,
} from "./index"

import {
  isArrayType,
  isBoolean,
  isNull,
  isNumeric,
  isInteger,
  isObjectType,
  isStringType,
  isSchemaComposition,
} from "../utils/index"

import type { JSONSchema, TypeValues } from "../types"

// Render a single type
type SingleTypeProps = {
  schema: JSONSchema
  nullable?: boolean
  type?: TypeValues
}

function RenderSingleType(props: SingleTypeProps): JSX.Element {
  const { schema, type, nullable } = props

  return <RenderProvidedType schema={schema} type={type} nullable={nullable} />
}

// Render multiple type
type MultipleTypesProps = {
  schema: JSONSchema
  nullable?: boolean
  types: {
    value: TypeValues
    label: JSX.Element
  }[]
}

function RenderMultipleTypes(props: MultipleTypesProps): JSX.Element {
  const { schema, types, nullable } = props

  return (
    <Tabs defaultValue={types[0].value} values={types} key={"multiple_types"}>
      {types.map((val) => (
        <TabItem key={val.value} value={val.value}>
          {
            <RenderProvidedType
              type={val.value}
              schema={schema}
              nullable={nullable}
            />
          }
        </TabItem>
      ))}
    </Tabs>
  )
}

// Detect types in schema
// Zero, One or multiple types can match
function* foundUndeclaredTypes(
  schema: Exclude<JSONSchema, true | false>
): Generator<TypeValues, void> {
  if (isNull(schema)) {
    yield "null"
  }

  if (isObjectType(schema)) {
    yield "object"
  }

  if (isArrayType(schema)) {
    yield "array"
  }

  if (isStringType(schema)) {
    yield "string"
  }

  if (isBoolean(schema)) {
    yield "boolean"
  }

  if (isInteger(schema)) {
    yield "integer"
  }

  if (!isInteger(schema) && isNumeric(schema)) {
    yield "number"
  }

  // Job finished
  return undefined
}

type Props = {
  [x: string]: any
  schema: Exclude<JSONSchema, true | false>
}

// Entry point
export default function CreateTypes(props: Props): JSX.Element {
  const { schema } = props

  // Find declarated type(s) provided by user
  const declaredTypes: TypeValues[] = Array.isArray(schema.type)
    ? schema.type
    : schema.type !== undefined
    ? [schema.type]
    : []

  // Several possibilities
  // 1. User only used a single type (most common case)
  // 2. User used multiple types (e.g. ["string", "null"] or ["string", "number"])
  // 3. User didn't use any type and so we must "guess" what (s)he have in mind

  // Let's cover simple cases first
  // Either a single type that could be null
  const hasNull = declaredTypes.includes("null")
  if (declaredTypes.length === 1 || (hasNull && declaredTypes.length === 2)) {
    // Find not null type (either first entry or second, depending again of user definition)
    const notNullType = declaredTypes.find((s) => s !== "null")

    return (
      <RenderSingleType schema={schema} type={notNullType} nullable={hasNull} />
    )
  }

  // Second, we have multiple type provided by user
  if (declaredTypes.length > 1) {
    // remove null from resultset & prepare values & labels
    const values = declaredTypes
      .filter((s) => s !== "null")
      .map((type) => ({
        value: type,
        label: <TypeLabelSwitch type={type} />,
      }))

    return (
      <RenderMultipleTypes schema={schema} types={values} nullable={hasNull} />
    )
  }

  // Third, user didn't make my life easier, so it guess time
  let matchingTypes = [...foundUndeclaredTypes(schema)]
  const nullDetected = matchingTypes.includes("null")

  if (
    matchingTypes.length === 1 ||
    (nullDetected && declaredTypes.length === 2)
  ) {
    // Find not null type (either first entry or second, depending of my algorithm order)
    const notNullType = matchingTypes.find((s) => s !== "null")

    return (
      <RenderSingleType
        schema={schema}
        type={notNullType}
        nullable={nullDetected}
      />
    )
  }

  // Four, we have multiple type possible
  if (matchingTypes.length > 1) {
    // remove null from resultset & prepare values & labels
    const values = matchingTypes
      .filter((s) => s !== "null")
      .map((type) => ({
        value: type,
        label: <TypeLabelSwitch type={type} />,
      }))

    return (
      <RenderMultipleTypes
        schema={schema}
        types={values}
        nullable={nullDetected}
      />
    )
  }

  // If at the end, we cannot find a type, it likely means user put something like :
  // { "allOf": ... } or { "if": ... }

  // If we don't encounter the SchemaComposition (allOf, ...) case, let's assume it is any
  if (!isSchemaComposition(schema)) {
    return <CreateValidOrInvalid schema={schema} />
  }

  // Otherwise, we have a SchemaComposition, which will be handled by CreateNodes
  return <></>
}
