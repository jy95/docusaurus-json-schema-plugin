import React from "react"
import Layout from "@theme/Layout"
//import { useColorMode } from "@docusaurus/theme-common"
//import BrowserOnly from "@docusaurus/BrowserOnly"
// @ts-ignore
import JSONSchemaViewer from "@theme/JSONSchemaViewer"
// @ts-ignore
import JSONSchemaEditor from "@theme/JSONSchemaEditor"

import Schema from "@site/static/schemas/realWorld/boxFileSchema.json"

export default function BoxFileSchema(): JSX.Element {
  return (
    <Layout
      title={`Box File JSON Schema`}
      description="Description will go into a meta tag in <head />"
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ boxSizing: "border-box", width: "50%" }}>
          <JSONSchemaViewer schema={Schema} />
        </div>
        <div style={{ boxSizing: "border-box", width: "50%" }}>
          <JSONSchemaEditor schema={Schema} theme={"vs-dark"} />
        </div>
      </div>
    </Layout>
  )
}
