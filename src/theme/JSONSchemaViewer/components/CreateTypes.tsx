import React from "react"

import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import {
  TypeLabelSwitch,
  RenderProvidedType,
  CreateValidOrInvalid,
} from "./index"

import { isSchemaComposition, detectedTypes } from "../utils/index"

import type { JSONSchema, TypeValues } from "../types"

// Render a single type
type SingleTypeProps = {
  schema: Exclude<JSONSchema, true | false>
  nullable?: boolean
  type: TypeValues
}

function RenderSingleType(props: SingleTypeProps): JSX.Element {
  const { schema, type, nullable } = props

  return <RenderProvidedType schema={schema} type={type} nullable={nullable} />
}

// Render multiple type
type MultipleTypesProps = {
  schema: Exclude<JSONSchema, true | false>
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

type Props = {
  [x: string]: any
  schema: Exclude<JSONSchema, true | false>
}

// Entry point
export default function CreateTypes(props: Props): JSX.Element {
  const { schema } = props

  // Several possibilities
  // 1. User only used a single type (most common case)
  // 2. User used multiple types (e.g. ["string", "null"] or ["string", "number"])
  // 3. User didn't use any type and so we must "guess" what (s)he have in mind

  // Let's our function do the magic to find which types are declared or detected
  const foundTypes = detectedTypes(schema)

  // Let's cover simple cases first
  // Either a single type that could be null
  const hasNull = foundTypes.includes("null")
  if (foundTypes.length === 1 || (hasNull && foundTypes.length === 2)) {
    // Either we got the not null type (likely what the final user wants to express)
    // Either we consider first entry as fallback if it was a standalone "null"
    const firstType = foundTypes.find((s) => s !== "null") || foundTypes[0]

    return (
      <RenderSingleType schema={schema} type={firstType} nullable={hasNull} />
    )
  }

  // Second, we have multiple type provided by user
  if (foundTypes.length > 1) {
    // remove null from resultset & prepare values & labels
    const values = foundTypes
      .filter((s) => s !== "null")
      .map((type) => ({
        value: type,
        label: <TypeLabelSwitch type={type} />,
      }))

    return (
      <RenderMultipleTypes schema={schema} types={values} nullable={hasNull} />
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
