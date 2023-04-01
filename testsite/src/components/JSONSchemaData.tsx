import React from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"
import { useColorMode } from "@docusaurus/theme-common"

import JSONSchemaEditor from "@theme/JSONSchemaEditor"
import { JSONSchemaFaker } from "json-schema-faker"

// Context
import { usePlaygroundContext } from "@site/src/contexts/PlaygroundContext"
import Toolbar from "@site/src/components/DataToolbar"
import { toast } from "react-toastify"

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

  // To regenerate data
  const generateFakeData = () => {
    const editor = editorRef.current
    if (editor) {
      //toast.info("Generating data ...")
      JSONSchemaFaker.resolve(userSchema)
        .then((sample) => {
          editor.setValue(STRINGIFY_JSON(sample))
        })
        .catch((err) =>
          toast.error((err as Error).message, { autoClose: 5000 })
        )
    }
  }

  // For copy
  const handleCopy = async () => {
    // Get the text to copy
    const editor = editorRef.current
    if (editor) {
      // Get the text to copy
      const textToCopy: string = editor.getModel().getValue() || ("" as string)

      // Copy the text to the clipboard using the Clipboard API
      await navigator.clipboard.writeText(textToCopy)

      toast.success("Data copied")
    }
  }

  return (
    <div style={{ boxSizing: "border-box", width: "50%" }}>
      <Toolbar
        onGenerate={generateFakeData}
        onCopy={handleCopy}
        onExport={() => {
          toast.info("Exporting data ...")
          const editor = editorRef.current
          if (editor) {
            return editor.getModel().getValue() || ("" as string)
          }
          // Nothing to export
          return ""
        }}
        onImport={(jsonData) => {
          const editor = editorRef.current
          if (editor) {
            console.log("HERE")
            editor.getModel().setValue(JSON.stringify(jsonData, null, "\t"))
          }
        }}
      />
      <JSONSchemaEditor
        value={"{}"}
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
