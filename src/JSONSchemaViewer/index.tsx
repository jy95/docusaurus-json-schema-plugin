import React, { useEffect, useState } from "react"
import Layout from "@theme/Layout"
import Translate from "@docusaurus/Translate"

import type { JSONSchema7 } from "json-schema"

import JSONSchemaViewer from "./JSONSchemaInnerViewer"

type ViewerProperties = {
  loadSchema: () => Promise<JSONSchema7>
}

function JSONSchemaEditor(props: ViewerProperties): JSX.Element {
  const [schema, setSchema] = useState(undefined as undefined | JSONSchema7)
  const [fetchError, setFetchError] = useState(undefined as undefined | Error)

  useEffect(() => {
    props
      .loadSchema()
      .then((userSchema) => setSchema(userSchema))
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
                id: "docusaurus-json-viewer-plugin.error",
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
            <Translate values={{ id: "docusaurus-json-viewer-plugin.loading" }}>
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
