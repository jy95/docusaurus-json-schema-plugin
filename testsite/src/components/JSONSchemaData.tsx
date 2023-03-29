import React from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"
import { useColorMode } from "@docusaurus/theme-common"

import JSONSchemaEditor from "@theme/JSONSchemaEditor"
import { JSONSchemaFaker } from "json-schema-faker"

// Context
import { usePlaygroundContext } from "@site/src/contexts/PlaygroundContext"

// Type I need for useRef
import type { MonacoEditorTypes } from "@theme/MonacoEditor"

// Common stringify of the JSON
const STRINGIFY_JSON = (json: unknown) => JSON.stringify(json, null, "\t")

function JSONSchemaDataInner(): JSX.Element {
  const {
    state: { userSchema },
  } = usePlaygroundContext()

  const { colorMode } = useColorMode()

  // Reference for example editor
  const editorRef =
    React.useRef<null | MonacoEditorTypes.IStandaloneCodeEditor>(null)

  function generateFakeData() {
    const editor = editorRef.current
    if (editor) {
      JSONSchemaFaker.resolve(userSchema)
        .then((sample) => {
          editor.setValue(STRINGIFY_JSON(sample))
        })
        .catch((err) => alert(err))
    }
  }

  return (
    <div style={{ boxSizing: "border-box", width: "50%" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        JSON Schema Editor
      </h1>
      <div>
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4caf50",
            border: "none",
            color: "#ffffff",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={() => generateFakeData()}
        >
          Generate Fake Data
        </button>
      </div>
      <JSONSchemaEditor
        schema={userSchema}
        theme={colorMode === "dark" ? "vs-dark" : "vs"}
        editorDidMount={(editor) => {
          editorRef.current = editor
        }}
        height={"70vh"}
        key={STRINGIFY_JSON(userSchema)}
      />
    </div>
  )
}

export default function JSONSchemaDataComponent(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return <JSONSchemaDataInner />
      }}
    </BrowserOnly>
  )
}
