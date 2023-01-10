import React, { useEffect, useState } from "react"
import Layout from "@theme/Layout"
import Translate from "@docusaurus/Translate"
import AllOfMerger from "json-schema-merge-allof"
import { Resolver } from "@stoplight/json-ref-resolver"

import type { JSONSchema7 } from "json-schema"

import JSONSchemaViewer from "./JSONSchemaInnerViewer"

type ViewerProperties = {
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

function JSONSchemaEditor(props: ViewerProperties): JSX.Element {
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
                id: "docusaurus-json-schema-viewer-plugin.error",
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
            <Translate values={{ id: "docusaurus-json-schema-viewer-plugin.loading" }}>
              {"Loading schema ..."}
            </Translate>
          </p>
        </div>
      )}
      {schema !== undefined && <JSONSchemaViewer schema={schema} />}
    </Layout>
  )
}

export default JSONSchemaEditor
