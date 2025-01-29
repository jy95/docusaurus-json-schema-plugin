import React from "react"

import ReactMonacoEditor from "react-monaco-editor"
import BrowserOnly from "@docusaurus/BrowserOnly"
import ErrorBoundary from "@docusaurus/ErrorBoundary"

import {
  LoadingLabel,
  ErrorOccurredLabel,
} from "@theme/JSONSchemaViewer/labels"

import type { JSX } from "react"
import type { Props as ErrorProps } from "@theme/Error"
import type { MonacoEditorProps } from "react-monaco-editor"

export type Props = MonacoEditorProps

// Useful for people using "useRef" with monaco
import type * as MonacoEditorTypes from "monaco-editor/esm/vs/editor/editor.api"
export type { MonacoEditorTypes }

// Re-export Monaco own interface, in case people want to add custom validation, ...
export * as monaco from "monaco-editor/esm/vs/editor/editor.api"

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

//
export default function MonacoEditor(props: Props) {
  return (
    <BrowserOnly fallback={<LoadingLabel />}>
      {() => (
        <>
          <ErrorBoundary fallback={(props) => <EditorError {...props} />}>
            <ReactMonacoEditor {...props} />
          </ErrorBoundary>
        </>
      )}
    </BrowserOnly>
  )
}
