import React from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"

import JSONSchemaViewer from "@theme/JSONSchemaViewer"
import JSONSchemaCreator from "@site/src/components/JSONSchemaCreator"
import JSONSchemaData from "@site/src/components/JSONSchemaData"

import {
  PlaygroundContextProvider,
  usePlaygroundContext,
} from "@site/src/contexts/PlaygroundContext"

// Default example to illustrate stuff (it is Draft-07 for info)
import DefaultSchema from "@site/static/schemas/examples/object/additionalProperties.json"

// Type I need for useRef
import type { State as PlaygroundState } from "@site/src/contexts/PlaygroundContext"

// Common stringify of the JSON
const STRINGIFY_JSON = (json: unknown) => JSON.stringify(json, null, "\t")

function PlaygroundInner(): JSX.Element {
  const {
    state: { userSchema },
  } = usePlaygroundContext()

  return (
    <div
      style={{ display: "flex", flexDirection: "column", overflowY: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <JSONSchemaCreator />
        <JSONSchemaData key={STRINGIFY_JSON(userSchema)} />
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          JSON Schema Viewer
        </h1>
        <JSONSchemaViewer
          schema={userSchema}
          key={STRINGIFY_JSON(userSchema)}
        />
      </div>
    </div>
  )
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
