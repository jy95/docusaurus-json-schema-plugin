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

// Toolbar
import Toolbar from "@site/src/components/SchemaToolbar"

import { toast } from "react-toastify"

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
    state: { fullSchema, schemaRef },
    updateState,
  } = usePlaygroundContext()
  const { colorMode } = useColorMode()

  // Properly handle pointer change
  async function handlePointerChange(newSchema: any) {
    // Next pointer value (by default, reset it)
    let nextPointer = ""

    // If "$ref" is found at the root level, consider it first
    if (newSchema["$ref"] !== undefined) {
      nextPointer = newSchema["$ref"]
    }

    // Update the user schema according to the modification
    if (nextPointer.length === 0) {
      updateState({ userSchema: newSchema, jsonPointer: nextPointer })
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
        updateState({
          userSchema: resolvedSchema.result,
          jsonPointer: nextPointer,
        })
      } catch (error) {
        // KIS strategy
        toast.error((error as Error).message, { autoClose: 5000 })
      }
    }
  }

  // Turn user schema to other components
  async function updateView() {
    try {
      // What the user puts
      let customSchemaString = schemaRef?.getModel().getValue()
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
      schemaRef?.getModel(),
      "schema-validation",
      markers
    )
  }

  // For copy
  const handleCopy = async () => {
    // Get the text to copy
    const textToCopy: string = schemaRef.getModel().getValue() || ("" as string)

    // Copy the text to the clipboard using the Clipboard API
    await navigator.clipboard.writeText(textToCopy)

    toast.success("Schema copied")
  }

  return (
    <div style={{ boxSizing: "border-box", width: "50%" }}>
      <Toolbar
        onRefresh={async () => {
          await updateView()
        }}
        onCopy={handleCopy}
        onExport={() => {
          toast.info("Exporting Schema ...")
          return schemaRef.getModel().getValue() || ("" as string)
        }}
        onImport={async (jsonData) => {
          schemaRef.setValue(JSON.stringify(jsonData, null, "\t"))
          await updateView()
        }}
      />
      <MonacoEditor
        value={STRINGIFY_JSON(fullSchema)}
        theme={colorMode === "dark" ? "vs-dark" : "vs"}
        language="json"
        height={"70vh"}
        editorDidMount={(editor) => {
          updateState({ schemaRef: editor })
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
