import React from "react"
import MonacoEditor from "react-monaco-editor"
import BrowserOnly from "@docusaurus/BrowserOnly"
import ErrorBoundary from "@docusaurus/ErrorBoundary"

import type { JSONSchema as Draft_07 } from "json-schema-typed/draft-07"
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

  const editorWillMount: EditorWillMount = (monaco) => {
    // Assume it is a JSONSchema 7 by default
    let typedSchema = schema as Draft_07
    let schemaId =
      typeof typedSchema !== "boolean" && typedSchema.$id !== undefined
        ? typedSchema.$id
        : "https://docusaurus.io/json-viewer/schema.json"

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: schemaId,
          fileMatch: ["*"], // associate with our model
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
