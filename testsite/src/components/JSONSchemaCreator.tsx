import React from "react"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"
import { Resolver } from "@stoplight/json-ref-resolver"

// For validate json schema, since I can't rely on Monaco Editor
import Ajv from "ajv"

// Transitive dep I need to add validation in the schema
import MonacoEditor, { monaco } from "@theme/MonacoEditor"

// To get the location of line
import { jsonpos } from "jsonpos"

// Context
import { usePlaygroundContext } from "@site/src/contexts/PlaygroundContext"

// Type I need for useRef
import type { MonacoEditorTypes } from "@theme/MonacoEditor"

import type { DefinedError } from "ajv"

// Common stringify of the JSON
const STRINGIFY_JSON = (json: unknown) => JSON.stringify(json, null, "\t")

// To estimate the criticity of an error
type ReturnedSeverity = {
  markIdentifier: boolean
  severity: MonacoEditorTypes.MarkerSeverity
}
function getSeverity(error: DefinedError): ReturnedSeverity {
  switch (error.keyword) {
    case "type":
    case "maxItems":
    case "minItems":
    case "minLength":
    case "maxLength":
    case "maximum":
    case "minimum":
    case "exclusiveMaximum":
    case "exclusiveMinimum":
    case "minProperties":
    case "maxProperties":
    case "pattern":
    case "multipleOf":
      return { markIdentifier: false, severity: monaco.MarkerSeverity.Warning }
    case "format":
    case "uniqueItems":
      return { markIdentifier: false, severity: monaco.MarkerSeverity.Info }
    case "const":
    case "enum":
      return { markIdentifier: false, severity: monaco.MarkerSeverity.Hint }
    default:
      return { markIdentifier: false, severity: monaco.MarkerSeverity.Error }
  }
}

function JSONSchemaCreatorInner(): JSX.Element {
  const {
    state: { jsonPointer, fullSchema },
    updateState,
  } = usePlaygroundContext()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { colorMode } = useColorMode()

  // Reference for source editor
  const sourceRef =
    React.useRef<null | MonacoEditorTypes.IStandaloneCodeEditor>(null)

  // Properly handle pointer change
  async function handlePointerChange(newSchema: any) {
    // What is currently on input field
    const currentPointer = inputRef.current.value

    // Next pointer value
    let nextPointer = ""

    // If input field is empty but "$ref" is found at the root level, consider it first
    if (currentPointer.length === 0 && newSchema["$ref"] !== undefined) {
      nextPointer = newSchema["$ref"]
    }

    // If input is not empty, let's take it
    if (currentPointer.length > 0) {
      nextPointer = currentPointer
    }

    // Otherwise, if user wants to remove it, respect the choice
    if (currentPointer.length === 0 && jsonPointer.length > 0) {
      nextPointer = ""
    }

    // At the end, update ref
    inputRef.current.value = nextPointer
    updateState({ jsonPointer: nextPointer })

    // Update the user schema according to the modification
    if (nextPointer.length === 0) {
      updateState({ userSchema: newSchema })
    } else {
      try {
        const resolvedSchema = await new Resolver().resolve(newSchema, {
          // Add pointer only when useful
          jsonPointer:
            typeof newSchema === "object" &&
            !Array.isArray(newSchema) &&
            newSchema !== null
              ? nextPointer
              : undefined,
        })
        updateState({ userSchema: resolvedSchema.result })
      } catch (error) {
        // KIS strategy
        alert(error)
      }
    }
  }

  // Turn user schema to other components
  async function updateView() {
    try {
      const editor = sourceRef.current
      if (!editor) {
        return
      }

      // What the user puts
      let customSchemaString = editor.getModel().getValue()
      let newSchema = JSON.parse(customSchemaString)

      // Update full schema
      updateState({ fullSchema: newSchema })

      // $ref handling
      await handlePointerChange(newSchema)

      // Run validations
      await validateJSONSchema(newSchema)
    } catch (error) {
      // KIS warning
      alert(error)
    }
  }

  // Apply validation of AJV
  async function validateJSONSchema(newSchema: unknown) {
    const editor = sourceRef.current

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
        // Criticy of the error
        const evaluatedError = getSeverity(error as DefinedError)

        // common props for marker
        let marker: MonacoEditorTypes.IMarkerData = {
          message: error.message,
          severity: evaluatedError.severity,
        }

        // if location can be found
        if (error.instancePath.length > 0) {
          // Get location information
          const location = jsonpos(jsonASString, {
            // error.schemaPath would match the Draft-7, ... specs which isn't what user wants
            pointerPath: error.instancePath,
            markIdentifier: evaluatedError.markIdentifier,
          })

          // set up location
          marker.startLineNumber = location.start.line
          marker.startColumn = location.start.column
          marker.endLineNumber = location.end.line
          marker.endColumn = location.end.column
        }

        // Add the marker
        markers.push(marker)
      })
    }

    // Set up validation error, if any
    monaco.editor.setModelMarkers(
      editor.getModel(),
      "schema-validation",
      markers
    )
  }

  return (
    <div style={{ boxSizing: "border-box", width: "50%" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Schema</h1>
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
          ref={inputRef}
          defaultValue={jsonPointer}
        />
      </div>
      <MonacoEditor
        value={STRINGIFY_JSON(fullSchema)}
        theme={colorMode === "dark" ? "vs-dark" : "vs"}
        language="json"
        height={"70vh"}
        editorDidMount={(editor) => {
          sourceRef.current = editor
        }}
      />
    </div>
  )
}

export default function JSONSchemaCreatorComponent(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return <JSONSchemaCreatorInner />
      }}
    </BrowserOnly>
  )
}
