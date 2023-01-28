import React, { useState, useEffect } from "react"
import { Resolver } from "@stoplight/json-ref-resolver"

import { CreateNodes, Collapsible } from "./components/index"

import type { JSONSchema as Draft_07 } from "json-schema-typed/draft-07"
import type { JSONSchema as Draft_2019_09 } from "json-schema-typed/draft-2019-09"
import type { JSONSchema as Draft_2020_12 } from "json-schema-typed/draft-2020-12"
import type { IResolverOpts } from "@stoplight/json-ref-resolver/types"

export type Props = {
  // The schema to use
  schema: unknown
  // To customize the ref resolving
  resolverOptions?: IResolverOpts
  [x: string]: any
}

type InnerViewerProperties = {
  // Thanks to @stoplight/json-ref-resolver, $ref are either :
  // 1. resolved
  // 2. unresolved (as circular stuff are not on the roadmap)
  schema: Draft_07 | Draft_2019_09 | Draft_2020_12
}

// Internal
function JSONSchemaInnerViewer(props: InnerViewerProperties): JSX.Element {
  const { schema } = props
  // Title of the schema, for user friendliness
  const title =
    typeof schema !== "boolean" && schema?.title !== undefined
      ? schema.title
      : "Schema"
  return (
    <Collapsible
      summary={<strong>{title}</strong>}
      detailsProps={{
        open: true,
      }}
    >
      <CreateNodes schema={schema} />
    </Collapsible>
  )
}

// Entry point
export default function JSONSchemaViewer(props: Props): JSX.Element {
  const { schema: originalSchema, resolverOptions } = props

  const [error, setError] = useState(undefined as undefined | Error)
  const [resolvedSchema, setResolvedSchema] = useState(
    undefined as undefined | Draft_07 | Draft_2019_09 | Draft_2020_12
  )

  useEffect(() => {
    // Set up resolver
    const resolver = new Resolver(resolverOptions)

    // Time to do the job
    resolver
      .resolve(originalSchema)
      .then((result) => {
        setResolvedSchema(result.result)
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  if (error !== undefined) {
    return <div>Something bad happens : {error.message}</div>
  } else if (resolvedSchema === undefined) {
    return <div>Loading ....</div>
  } else {
    return <JSONSchemaInnerViewer schema={resolvedSchema} />
  }
}
