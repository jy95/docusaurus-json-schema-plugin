import React from "react"
import Layout from "@theme/Layout"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"
// @ts-ignore
import JSONSchemaViewer from "@theme/JSONSchemaViewer"
// @ts-ignore
import JSONSchemaEditor from "@theme/JSONSchemaEditor"

import Schema from "@site/static/schemas/realWorld/boxFileSchema.json"

function JSONSchemaEditorWrapper(): JSX.Element {
  const { colorMode } = useColorMode()
  return (
    <JSONSchemaEditor
      schema={Schema}
      theme={colorMode === "dark" ? "vs-dark" : "vs"}
    />
  )
}

function BoxFileInnerSchema(): JSX.Element {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ boxSizing: "border-box", width: "50%" }}>
        <JSONSchemaViewer schema={Schema} />
      </div>
      <div style={{ boxSizing: "border-box", width: "50%" }}>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
            return <JSONSchemaEditorWrapper />
          }}
        </BrowserOnly>
      </div>
    </div>
  )
}

export default function BoxFileSchema(): JSX.Element {
  return (
    <Layout
      title={`Box File JSON Schema`}
      description="Description will go into a meta tag in <head />"
    >
      <BoxFileInnerSchema />
    </Layout>
  )
}
