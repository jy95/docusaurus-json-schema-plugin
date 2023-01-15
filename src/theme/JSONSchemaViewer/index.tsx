import React, { useEffect, useState } from "react"
import Layout from "@theme-original/Layout"
import Translate from "@docusaurus/Translate"
import AllOfMerger from "json-schema-merge-allof"
import { Resolver } from "@stoplight/json-ref-resolver"

import { CreateNodes } from "./components/index"

import type { JSONSchema7 } from "json-schema"

export type Props = {
  loadSchema: () => Promise<JSONSchema7>
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
  return <ul style={{ marginLeft: "1rem" }}>{CreateNodes(props.schema)}</ul>
}


// Entry point
function JSONSchemaViewer(props: Props): JSX.Element {
  const [schema, setSchema] = useState(
    undefined as undefined | Omit<JSONSchema7, "allOf">
  )
  const [fetchError, setFetchError] = useState(undefined as undefined | Error)

  useEffect(() => {
    props
      .loadSchema()
      .then((userSchema) => new Resolver().resolve(userSchema))
      .then((resolvedSchema) => mergeAllOf(resolvedSchema.result))
      .then((schemaWithoutAllOf) => setSchema(schemaWithoutAllOf))
      .catch((err) => setFetchError(err))
  }, [])

  return (
    <Layout>
      {fetchError !== undefined && (
        <div>
          <p>
            <Translate
              values={{
                errorMessage: fetchError.message,
                id: "error",
              }}
            >
              {"This component crashed because of error: {errorMessage}."}
            </Translate>
          </p>
        </div>
      )}
      {schema === undefined && (
        <div>
          <p>
            <Translate values={{ id: "loading" }}>
              {"Loading schema ..."}
            </Translate>
          </p>
        </div>
      )}
      {schema !== undefined && <JSONSchemaInnerViewer schema={schema} />}
    </Layout>
  )
}

export default JSONSchemaViewer;
