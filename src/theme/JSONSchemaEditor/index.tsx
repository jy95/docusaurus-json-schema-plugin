import React from "react"
import MonacoEditor from "react-monaco-editor"
import { useColorMode } from "@docusaurus/theme-common"

import type { JSONSchema7 } from "json-schema"
import type { EditorWillMount, MonacoEditorProps } from "react-monaco-editor"

export type Props = {
  schema: JSONSchema7
  defaultValue?: any
} & MonacoEditorProps

function JSONSchemaEditorInner(props: Props): JSX.Element {
  const { schema, ...editorProps } = props
  const { colorMode } = useColorMode()

  const editorWillMount: EditorWillMount = (monaco) => {
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
    <MonacoEditor
      height="90vh"
      language="json"
      defaultValue={props.defaultValue}
      editorWillMount={editorWillMount}
      theme={colorMode === "dark" ? "vs-dark" : "vs"}
      {...editorProps}
    />
  )
}

// The public component
// Notice from https://docusaurus.io/docs/api/themes/configuration#use-color-mode
// The component calling useColorMode must be a child of the Layout component.
function JSONSchemaEditor(props: Props): JSX.Element {
  return <JSONSchemaEditorInner {...props} />
}

export default JSONSchemaEditor
