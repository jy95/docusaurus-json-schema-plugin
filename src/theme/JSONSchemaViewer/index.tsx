import React from "react"
import AllOfMerger from "json-schema-merge-allof"
import { Resolver } from "@stoplight/json-ref-resolver"

import { CreateNodes } from "./components/index"

import type { JSONSchema7 } from "json-schema"
import type { IResolverOpts } from "@stoplight/json-ref-resolver/types"

export type Props = {
  schema: JSONSchema7
  // To customize the ref resolving
  resolverOptions?: IResolverOpts
  [x: string]: any
}

// merged representation of allOf array of schemas
async function mergeAllOf(
  schema: JSONSchema7
): Promise<Omit<JSONSchema7, "allOf">> {
  const mergedSchema = AllOfMerger(schema, {
    // Technically valid, but only interested on fields with name, at least for now ...
    ignoreAdditionalProperties: true,
  })

  return Promise.resolve(mergedSchema as Omit<JSONSchema7, "allOf">)
}

type InnerViewerProperties = {
  // Thanks to json-schema-merge-allof , we don't have allOf in the whole user schema
  // Thanks to @stoplight/json-ref-resolver, $ref are either :
  // 1. resolved
  // 2. unresolved (as circular stuff are not on the roadmap)
  schema: Omit<JSONSchema7, "allOf">
}

// Internal
function JSONSchemaInnerViewer(props: InnerViewerProperties): JSX.Element {
  return (
    <ul style={{ marginLeft: "1rem" }}>
      <CreateNodes schema={props.schema} />
    </ul>
  )
}

// Entry point
function JSONSchemaViewer(props: Props): JSX.Element {
  const { schema: originalSchema, resolverOptions } = props

  // Set up resolver
  // @ts-ignore
  const resolver = new Resolver(resolverOptions)

  // TODO How do I wait for async to be complete before I run that ?
  // resolver.resolve(originalSchema);

  // Simplify schema
  const simplifiedSchema =
    originalSchema?.allOf !== undefined
      ? mergeAllOf(originalSchema)
      : originalSchema

  return (
    <JSONSchemaInnerViewer
      schema={simplifiedSchema as Omit<JSONSchema7, "allOf">}
    />
  )
}

export default JSONSchemaViewer
