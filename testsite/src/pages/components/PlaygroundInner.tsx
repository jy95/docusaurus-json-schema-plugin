import React from "react"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

import JSONSchemaEditor from "@theme/JSONSchemaEditor"
import JSONSchemaViewer from "@theme/JSONSchemaViewer"
import { JSONSchemaFaker } from "json-schema-faker"

// For validate json schema, since I can't rely on Monaco Editor
import Ajv from "ajv"

// To get the location of line
import { jsonpos } from "jsonpos"

// Default example to illustrate stuff (it is Draft-07 for info)
import DefaultSchema from "@site/static/schemas/examples/object/additionalProperties.json"

// Transitive dep I need to add validation in the schema
import { monaco } from "@theme/MonacoEditor"

// Type I need for useRef
import type { MonacoEditorTypes } from "@theme/MonacoEditor"

// Common stringify of the JSON
const STRINGIFY_JSON = (json: unknown) => JSON.stringify(json, null, "\t")

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
  const editorRef =
    React.useRef<null | MonacoEditorTypes.IStandaloneCodeEditor>(null)

  // Reference for source editor
  const sourceRef =
    React.useRef<null | MonacoEditorTypes.IStandaloneCodeEditor>(null)

  React.useEffect(() => {
    setCustomSchemaString(STRINGIFY_JSON(userSchema))
  }, [userSchema])

  // Turn user schema to other components
  async function updateView() {
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
      await validateJSONSchema(newSchema)
    } catch (error) {
      // KIS warning
      alert(error)
    }
  }

  // Apply validation of AJV
  async function validateJSONSchema(newSchema: unknown) {
    const editor = sourceRef.current

    // Wait for the `monaco` object to be loaded
    const monacoInstance = await monaco

    if (!editor) {
      return
    }

    const ajv = new Ajv({
      allErrors: true,
      // I don't care if people add extra stuff in their schema
      strictSchema: false,
      // Overlap between "properties" and "patternProperties" keywords
      allowMatchingProperties: true,
      // Defined required properties strictRequired option (used in "if" for instance)
      strictRequired: false,
      // type compatibility is troublesome, so enable it
      strictTypes: true,
      // Unconstrained tuples is user own issue, not mine
      strictTuples: false,
      // Don't care about format
      validateFormats: false,
      // Schema needs to be validated
      validateSchema: true,
    })

    const markers = []
    const jsonASString = STRINGIFY_JSON(newSchema)

    let valid = ajv.validateSchema(newSchema)

    if (!valid) {
      const errors = ajv.errors
      errors.forEach((error) => {
        // Get location information
        const location = jsonpos(jsonASString, {
          // error.schemaPath would match the Draft-7, ... specs which isn't what user wants
          pointerPath: error.instancePath,
        })

        // Add the marker
        markers.push({
          startLineNumber: location.start.line,
          startColumn: location.start.column,
          endLineNumber: location.end.line,
          endColumn: location.end.column,
          message: error.message,
          severity: monacoInstance.MarkerSeverity.Error,
        })
      })
    }

    // Set up validation error, if any
    monacoInstance.editor.setModelMarkers(
      editor.getModel(),
      "schema-validation",
      markers
    )
  }

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
            value={STRINGIFY_JSON(userSchema)}
            // For some reason, monaco editor can ignore empty schema when $schema is provided
            schema={{}}
            onChange={(newValue: string) => {
              // Remember what the user puts
              setCustomSchemaString(newValue)
            }}
            editorDidMount={(editor) => {
              sourceRef.current = editor
            }}
          />
        </div>
        <div
          style={{ boxSizing: "border-box", width: "50%" }}
          key={STRINGIFY_JSON(userSchema)}
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
      <div key={STRINGIFY_JSON(userSchema)}>
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

export default function PlaygroundComponent(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return <PlaygroundInner />
      }}
    </BrowserOnly>
  )
}
