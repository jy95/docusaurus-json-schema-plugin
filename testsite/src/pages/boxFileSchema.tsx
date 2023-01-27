import React from "react"
import Layout from "@theme/Layout"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

import Schema from "@site/static/schemas/realWorld/boxFileSchema.json"

function BoxFileInnerSchema(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const { colorMode } = useColorMode()
        const JSONSchemaViewer = require("@theme/JSONSchemaViewer").default
        const JSONSchemaEditor = require("@theme/JSONSchemaEditor").default

        return (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ boxSizing: "border-box", width: "50%" }}>
              <JSONSchemaViewer schema={Schema} />
            </div>
            <div style={{ boxSizing: "border-box", width: "50%" }}>
              <JSONSchemaEditor
                schema={Schema}
                theme={colorMode === "dark" ? "vs-dark" : "vs"}
              />
            </div>
          </div>
        )
      }}
    </BrowserOnly>
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
