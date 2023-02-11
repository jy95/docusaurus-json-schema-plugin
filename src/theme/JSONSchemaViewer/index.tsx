import React, { useState, useEffect } from "react"
import { Resolver } from "@stoplight/json-ref-resolver"
import Translate from "@docusaurus/Translate"

import { CreateNodes, Collapsible } from "./components/index"
import { JSVOptionsContextProvider } from "./contexts/index"

import type { JSONSchema } from "./types"
import type { JSVOptions } from "./contexts/index"
import type { IResolveOpts } from "@stoplight/json-ref-resolver/types"

export type Props = {
  // The schema to use
  schema: unknown
  // To customize the ref resolving
  resolverOptions?: IResolveOpts
  // To customize the viewer
  viewerOptions?: Omit<JSVOptions, "fullSchema">
  // Other properties (who knows ?)
  [x: string]: any
}

type InnerViewerProperties = {
  // Thanks to @stoplight/json-ref-resolver, $ref are either :
  // 1. resolved
  // 2. unresolved (as circular stuff are not on the roadmap)
  schema: JSONSchema
  // Options for viewer
  viewerOptions?: Omit<JSVOptions, "fullSchema">
}

// Translated labels
function Loading(): JSX.Element {
  return (
    <div>
      <Translate
        values={{
          id: "json-schema.labels.loading",
        }}
      >
        {"Loading ...."}
      </Translate>
    </div>
  )
}

function ErrorOccurred(props: { error: Error }): JSX.Element {
  const { error } = props
  return (
    <div>
      <Translate
        values={{
          id: "json-schema.labels.errorOccurred",
          message: error.message,
        }}
      >
        {"Something bad happens : {message}"}
      </Translate>
    </div>
  )
}

// Internal
function JSONSchemaInnerViewer(props: InnerViewerProperties): JSX.Element {
  const { schema, viewerOptions } = props
  // Title of the schema, for user friendliness
  const title =
    typeof schema !== "boolean" && schema.title !== undefined
      ? schema.title
      : "Schema"

  // state for provider
  const startingState: JSVOptions = {
    fullSchema: schema,
    // spread provided attributes
    ...viewerOptions,
  }

  return (
    <JSVOptionsContextProvider value={startingState}>
      <Collapsible
        summary={<strong>{title}</strong>}
        detailsProps={{
          open: true,
        }}
      >
        <CreateNodes schema={schema} />
      </Collapsible>
    </JSVOptionsContextProvider>
  )
}

// Entry point
export default function JSONSchemaViewer(props: Props): JSX.Element {
  const { schema: originalSchema, resolverOptions, viewerOptions } = props

  const [error, setError] = useState(undefined as undefined | Error)
  const [resolvedSchema, setResolvedSchema] = useState(
    undefined as undefined | JSONSchema
  )

  useEffect(() => {
    // Time to do the job
    new Resolver()
      .resolve(originalSchema, resolverOptions)
      .then((result) => {
        setResolvedSchema(result.result)
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  if (error !== undefined) {
    return <ErrorOccurred error={error} />
  } else if (resolvedSchema === undefined) {
    return <Loading />
  } else {
    return (
      <JSONSchemaInnerViewer
        schema={resolvedSchema}
        viewerOptions={viewerOptions}
      />
    )
  }
}
