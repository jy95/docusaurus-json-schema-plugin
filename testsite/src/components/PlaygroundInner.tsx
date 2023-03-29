import React from "react"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

import JSONSchemaEditor from "@theme/JSONSchemaEditor"
import JSONSchemaViewer from "@theme/JSONSchemaViewer"
import JSONSchemaCreator from "@site/src/components/JSONSchemaCreator"
import { JSONSchemaFaker } from "json-schema-faker"

import {
  PlaygroundContextProvider,
  usePlaygroundContext,
} from "@site/src/contexts/PlaygroundContext"

// Default example to illustrate stuff (it is Draft-07 for info)
import DefaultSchema from "@site/static/schemas/examples/object/additionalProperties.json"

// Type I need for useRef
import type { MonacoEditorTypes } from "@theme/MonacoEditor"

import type { State as PlaygroundState } from "@site/src/contexts/PlaygroundContext"

// Common stringify of the JSON
const STRINGIFY_JSON = (json: unknown) => JSON.stringify(json, null, "\t")

function PlaygroundInner(): JSX.Element {
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
    <div style={{ display: "flex", flexDirection: "column", overflowY: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <JSONSchemaCreator />
        <div style={{ boxSizing: "border-box", width: "50%" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>JSON Schema Editor</h1>
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
              editorRef.current = editor;
            }}
            height={"70vh"}
            key={STRINGIFY_JSON(userSchema)}
          />
        </div>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>JSON Schema Viewer</h1>
        <JSONSchemaViewer schema={userSchema} key={STRINGIFY_JSON(userSchema)} />
      </div>
    </div>
  );
  
}

function StateProvider(): JSX.Element {
  const defaultSchema = {
    // To help monaco editor for JSON Schema definition
    $schema: "http://json-schema.org/draft-07/schema",
    // The demo schema
    ...DefaultSchema,
  }
  const [state, setState] = React.useState({
    jsonPointer: "",
    userSchema: defaultSchema,
    fullSchema: defaultSchema,
  } as PlaygroundState)

  // define a function to update the state
  function updateState(newState: Partial<PlaygroundState>) {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  return (
    <PlaygroundContextProvider value={{ state, updateState }}>
      <PlaygroundInner />
    </PlaygroundContextProvider>
  )
}

export default function PlaygroundComponent(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return <StateProvider />
      }}
    </BrowserOnly>
  )
}
