import React from "react"
import Layout from "@theme/Layout"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

//import JSONSchemaEditor from "@theme/JSONSchemaEditor"
//import JSONSchemaViewer from "@theme/JSONSchemaViewer"
import { JSONSchemaFaker } from "json-schema-faker"

// Default example to illustrate stuff (it is Draft-07 for info)
import DefaultSchema from "@site/static/schemas/examples/object/additionalProperties.json"

// Type I need for useRef
import type { MonacoEditor } from "@theme/JSONSchemaEditor"

function PlaygroundInner(): JSX.Element {
  // The current schema displayed
  let [userSchema, setUserSchema] = React.useState({
    // To help monaco editor for JSON Schema definition
    $schema: "http://json-schema.org/draft-07/schema",
    // The demo schema
    ...DefaultSchema,
  } as { [x: string]: any })

  // The schema user is currently writting
  let [customSchemaString, setCustomSchemaString] = React.useState("")

  // If user put a root "$ref"
  let [jsonPointer, setJsonPointer] = React.useState("")

  const { colorMode } = useColorMode()

  // Reference for example editor
  const editorRef = React.useRef(
    null as null | MonacoEditor.IStandaloneCodeEditor
  )

  React.useEffect(() => {
    setCustomSchemaString(JSON.stringify(userSchema))
  }, [userSchema])

  // Turn user schema to other components
  function updateView() {
    try {
      let newSchema = JSON.parse(customSchemaString)
      // if "$ref" is found at the root level and "jsonPointer" wasn't set, consider it as default
      if (jsonPointer.length === 0 && newSchema["$ref"] !== undefined) {
        setJsonPointer(newSchema["$ref"])
      }
      // Overwrite (if needed) root "$ref" in case the user wants to test out stuff
      // monaco editor relies on that to provide valuable auto-complete
      if (jsonPointer.length !== 0) {
        newSchema["$ref"] = jsonPointer
      }
      setUserSchema(newSchema)
    } catch (error) {
      // KIS warning
      alert(error)
    }
  }

  function generateFakeData() {
    const editor = editorRef.current
    if (editor) {
      JSONSchemaFaker.resolve(userSchema)
        .then((sample) => {
          editor.setValue(JSON.stringify(sample, null, "\t"))
        })
        .catch((err) => alert(err))
    }
  }

  const JSONSchemaViewer = require("@theme/JSONSchemaViewer").default
  const JSONSchemaEditor = require("@theme/JSONSchemaEditor").default

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ boxSizing: "border-box", width: "50%" }}>
          <h1>Schema</h1>
          <div>
            <button onClick={() => updateView()}>Update Editor / Viewer</button>
            &nbsp;
            <label
              htmlFor="jsonPointer"
              title="If you want to cover only a specific path of your specs, such as '#/definitions/*'"
            >
              JSON Pointer :
            </label>
            &nbsp;
            <input
              type="text"
              id="jsonPointer"
              name="jsonPointer"
              onChange={(e) => setJsonPointer(e.target.value)}
              value={jsonPointer}
            />
          </div>
          <JSONSchemaEditor
            value={JSON.stringify(userSchema, null, "\t")}
            // For some reason, monaco editor can ignore empty schema when $schema is provided
            schema={{}}
            onChange={(newValue: string) => {
              // Remember what the user puts
              setCustomSchemaString(newValue)
            }}
          />
        </div>
        <div
          style={{ boxSizing: "border-box", width: "50%" }}
          key={JSON.stringify(userSchema)}
        >
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
          />
        </div>
      </div>
      <div key={JSON.stringify(userSchema)}>
        <h1>JSON Schema Viewer</h1>
        <JSONSchemaViewer
          schema={userSchema}
          resolverOptions={{
            jsonPointer: jsonPointer.length !== 0 ? jsonPointer : undefined,
          }}
        />
      </div>
    </>
  )
}

function PlaygroundComponent(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return <PlaygroundInner />
      }}
    </BrowserOnly>
  )
}

export default function Playground(): JSX.Element {
  return (
    <Layout
      title={`Playground`}
      description="Description will go into a meta tag in <head />"
    >
      <PlaygroundComponent />
    </Layout>
  )
}
