import React from "react"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

import JSONSchemaEditor from "@theme/JSONSchemaEditor"
import JSONSchemaViewer from "@theme/JSONSchemaViewer"
import JSONSchemaCreator from "@site/src/components/JSONSchemaCreator"
import { JSONSchemaFaker } from "json-schema-faker"
import { Resolver } from "@stoplight/json-ref-resolver"

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
    state: { jsonPointer, userSchema },
  } = usePlaygroundContext()
  const { colorMode } = useColorMode()

  // Reference for example editor
  const editorRef =
    React.useRef<null | MonacoEditorTypes.IStandaloneCodeEditor>(null)

  function generateFakeData() {
    const editor = editorRef.current
    if (editor) {
      new Resolver()
        .resolve(userSchema, {
          // Add pointer only when useful
          jsonPointer:
            jsonPointer.length > 0 &&
            typeof userSchema === "object" &&
            !Array.isArray(userSchema) &&
            userSchema !== null
              ? jsonPointer
              : undefined,
        })
        .then((result) => {
          return JSONSchemaFaker.resolve(result.result)
        })
        .then((sample) => {
          editor.setValue(STRINGIFY_JSON(sample))
        })
        .catch((err) => alert(err))
    }
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <JSONSchemaCreator />
        <div style={{ boxSizing: "border-box", width: "50%" }}>
          <h1>JSON Schema Editor</h1>
          <div>
            <button onClick={() => generateFakeData()}>
              Generate fake data
            </button>
          </div>
          <JSONSchemaEditor
            schema={userSchema}
            theme={colorMode === "dark" ? "vs-dark" : "vs"}
            editorDidMount={(editor) => {
              editorRef.current = editor
            }}
            //key={STRINGIFY_JSON(userSchema) + jsonPointer}
          />
        </div>
      </div>
      <div>
        <h1>JSON Schema Viewer</h1>
        <JSONSchemaViewer
          schema={userSchema}
          //key={STRINGIFY_JSON(userSchema) + jsonPointer}
          resolverOptions={{
            jsonPointer: jsonPointer.length !== 0 ? jsonPointer : undefined,
          }}
        />
      </div>
    </>
  )
}

function StateProvider(): JSX.Element {
  const [state, setState] = React.useState({
    jsonPointer: "",
    userSchema: {
      // To help monaco editor for JSON Schema definition
      $schema: "http://json-schema.org/draft-07/schema",
      // The demo schema
      ...DefaultSchema,
    },
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
