import React from "react"
import Layout from "@theme/Layout"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

// You might say : Why the draft-07 in the playground ? Well several reasons :
// 1. Monaco editor can understand that better & suggest autocomplete
// 2. Monaco editor didn't at this time fully integrate 2020-12
// 3. AJV uses by default Draft-07
import ValidJSONSchema from "@site/static/specs/draft-07-schema.json"

// Default example to illustrate stuff
import DefaultSchema from "@site/static/schemas/examples/object/additionalProperties.json"

function PlaygroundInner(): JSX.Element {
  let [userSchema, setUserSchema] = React.useState(
    DefaultSchema as { [x: string]: any }
  )
  const { colorMode } = useColorMode()

  const JSONSchemaViewer = require("@theme/JSONSchemaViewer").default
  const JSONSchemaEditor = require("@theme/JSONSchemaEditor").default

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ boxSizing: "border-box", width: "50%" }}>
          <h1>Schema</h1>
          <JSONSchemaEditor
            value={JSON.stringify(userSchema, null, "\t")}
            schema={ValidJSONSchema}
            onChange={(newValue: string) => {
              try {
                let newSchema = JSON.parse(newValue)
                setUserSchema(newSchema)
              } catch (error) {
                // ignore that, still typing
              }
            }}
          />
        </div>
        <div style={{ boxSizing: "border-box", width: "50%" }}>
          <h1>JSON Schema Editor</h1>
          <JSONSchemaEditor
            schema={userSchema}
            theme={colorMode === "dark" ? "vs-dark" : "vs"}
          />
        </div>
      </div>
      <div>
        <h1>JSON Schema Viewer</h1>
        <JSONSchemaViewer schema={userSchema} />
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
