import React from "react"
import MonacoEditor from "react-monaco-editor"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"
import ErrorBoundary from "@docusaurus/ErrorBoundary"

import type { JSONSchema7 } from "json-schema"
import type { EditorWillMount, MonacoEditorProps } from "react-monaco-editor"
import type { Props as ErrorProps } from "@theme/Error"

export type Props = {
  schema: unknown
} & MonacoEditorProps

// When loading
function EditorLoading(props: any): JSX.Element {
  return <div>Loading...</div>
}

// When something bad happens
function EditorError({ error, tryAgain }: ErrorProps): JSX.Element {
  return (
    <div>
      <p>This component crashed because of error: {error.message}.</p>
      <button onClick={tryAgain}>Try Again!</button>
    </div>
  )
}

// Main component
function JSONSchemaEditorInner(props: Props): JSX.Element {
  const { schema, ...editorProps } = props
  const { colorMode } = useColorMode()

  const editorWillMount: EditorWillMount = (monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri:
            // Assume it is a JSONSchema 7 by default
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
      editorWillMount={editorWillMount}
      theme={colorMode === "dark" ? "vs-dark" : "vs"}
      {...editorProps}
    />
  )
}

// The public component
// Notice from https://docusaurus.io/docs/api/themes/configuration#use-color-mode
// The component calling useColorMode must be a child of the Layout component.
export default function JSONSchemaEditor(props: Props): JSX.Element {
  return (
    <BrowserOnly fallback={<EditorLoading />}>
      {() => (
        <>
          <ErrorBoundary fallback={(props) => <EditorError {...props} />}>
            <JSONSchemaEditorInner {...props} />
          </ErrorBoundary>
        </>
      )}
    </BrowserOnly>
  )
}
