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
      toast.info("Generating data ...")
      JSONSchemaFaker.resolve(userSchema)
        .then((sample) => {
          editor.setValue(STRINGIFY_JSON(sample))
        })
        .catch((err) => toast.error((err as Error).message))
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

  // For export
  const handleExport = () => {
    const editor = editorRef.current

    if (editor) {
      toast.info("Exporting data ...")

      // Get the text to export
      const textToCopy: string = editor.getModel().getValue() || ("" as string)

      // Create a new Blob object containing the data
      const dataBlob = new Blob([textToCopy], { type: "application/json" })

      // Create a URL for the blob using URL.createObjectURL()
      const url = URL.createObjectURL(dataBlob)

      // Create a new <a> element and set its href attribute to the URL
      const a = document.createElement("a")
      a.href = url

      // Set the download attribute of the <a> element to the desired filename
      a.download = "data.json"

      // Add the <a> element to the DOM and trigger a click event to download the file
      document.body.appendChild(a)
      a.click()

      // Remove the <a> element from the DOM
      document.body.removeChild(a)

      // Revoke the URL using URL.revokeObjectURL() to free up memory
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div style={{ boxSizing: "border-box", width: "50%" }}>
      <Toolbar
        onGenerate={generateFakeData}
        onCopy={handleCopy}
        onExport={handleExport}
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
