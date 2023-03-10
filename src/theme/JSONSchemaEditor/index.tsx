import React from "react"
import MonacoEditor from "react-monaco-editor"
import BrowserOnly from "@docusaurus/BrowserOnly"
import ErrorBoundary from "@docusaurus/ErrorBoundary"

import {
  LoadingLabel,
  ErrorOccurredLabel,
} from "../JSONSchemaViewer/labels/index"

import type { JSONSchema as Draft_07 } from "json-schema-typed/draft-07"
import type { EditorWillMount, MonacoEditorProps } from "react-monaco-editor"
import type { Props as ErrorProps } from "@theme/Error"

export type Props = {
  /**
   * The JSON schema to use
   */
  schema: unknown | unknown[]
} & MonacoEditorProps

// When something bad happens
function EditorError({ error, tryAgain }: ErrorProps): JSX.Element {
  return (
    <div>
      <p>
        <ErrorOccurredLabel error={error} />
      </p>
      <button onClick={tryAgain}>Try Again!</button>
    </div>
  )
}

// Find id or generate a default one
function findOrGenerateId(schema: unknown, idx: number): string {
  let typedSchema = schema as Draft_07

  if (typeof typedSchema === "boolean" || typedSchema.$id === undefined) {
    return `https://docusaurus.io/json-viewer/schema_${idx}.json`
  }

  return typedSchema.$id
}

// Main component
function JSONSchemaEditorInner(props: Props): JSX.Element {
  const { schema, ...editorProps } = props

  const editorWillMount: EditorWillMount = (monaco) => {
    // Streamline algorithm
    const userSchemas = Array.isArray(schema) ? schema : [schema]

    // monaco schema
    const monacoSchemas = userSchemas.map((userSchema, idx) => ({
      uri: findOrGenerateId(schema, idx),
      fileMatch: ["*"], // associate with our model
      schema: userSchema,
    }))

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: monacoSchemas,
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
    <BrowserOnly fallback={<LoadingLabel />}>
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
