import React from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"
import { useColorMode } from "@docusaurus/theme-common"

import JSONSchemaEditor from "@theme/JSONSchemaEditor"
import { JSONSchemaFaker } from "json-schema-faker"

// Context
import { usePlaygroundContext } from "@site/src/contexts/PlaygroundContext"
import Toolbar from "@site/src/components/DataToolbar"
import { toast } from "react-toastify"

// Common stringify of the JSON
const STRINGIFY_JSON = (json: unknown) => JSON.stringify(json, null, "\t")

function JSONSchemaDataInner(): JSX.Element {
  const {
    state: { userSchema, editorRef, data: value },
    updateState,
  } = usePlaygroundContext()

  const { colorMode } = useColorMode()

  // To regenerate data
  const generateFakeData = () => {
    //toast.info("Generating data ...")
    JSONSchemaFaker.resolve(userSchema)
      .then((sample) => {
        editorRef.setValue(STRINGIFY_JSON(sample))
      })
      .catch((err) => toast.error((err as Error).message, { autoClose: 5000 }))
  }

  // For copy
  const handleCopy = async () => {
    // Get the text to copy
    const textToCopy: string = editorRef.getModel().getValue() || ("" as string)

    // Copy the text to the clipboard using the Clipboard API
    await navigator.clipboard.writeText(textToCopy)

    toast.success("Data copied")
  }

  return (
    <div style={{ boxSizing: "border-box", width: "50%" }}>
      <Toolbar
        onGenerate={generateFakeData}
        onCopy={handleCopy}
        onExport={() => {
          toast.info("Exporting data ...")
          return editorRef.getModel().getValue() || ("" as string)
        }}
        onImport={(jsonData) => {
          editorRef.setValue(JSON.stringify(jsonData, null, "\t"))
        }}
      />
      <JSONSchemaEditor
        value={value}
        schema={userSchema}
        theme={colorMode === "dark" ? "vs-dark" : "vs"}
        editorDidMount={(editor) => {
          updateState({ editorRef: editor })
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
