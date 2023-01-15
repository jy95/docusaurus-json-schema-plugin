import React, { useEffect, useState } from "react"
import MonacoEditor from 'react-monaco-editor';
import { useColorMode } from "@docusaurus/theme-common"
import Layout from "@theme-original/Layout"
import Translate from "@docusaurus/Translate"

import type { JSONSchema7 } from "json-schema"
import type { EditorWillMount } from "react-monaco-editor";

export type Props = {
  loadSchema: () => Promise<JSONSchema7>
  defaultValue?: any
}

function JSONSchemaEditor(props: Props): JSX.Element {
  const [schema, setSchema] = useState(undefined as unknown)
  const [fetchError, setFetchError] = useState(undefined as undefined | Error)
  const { colorMode } = useColorMode()

  useEffect(() => {
    props
      .loadSchema()
      .then((userSchema) => setSchema(userSchema))
      .catch((err) => setFetchError(err))
  }, [])

  const editorWillMount : EditorWillMount = (monaco) => {

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri:
            (schema as JSONSchema7)["$id"] ||
            "https://docusaurus.io/json-viewer/schema.json",
          schema: schema,
        },
      ],
    })
  }

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
      {schema !== undefined && (
        <MonacoEditor
          height="90vh"
          language="json"
          defaultValue={props.defaultValue}
          editorWillMount={editorWillMount}
          theme={colorMode === "dark" ? "vs-dark" : "vs"}
        />
      )}
    </Layout>
  )
}

export default JSONSchemaEditor
