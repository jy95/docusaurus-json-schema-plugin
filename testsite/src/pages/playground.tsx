import React from "react"
import Layout from "@theme/Layout"
import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

// Default example to illustrate stuff (it is Draft-07 for info)
import DefaultSchema from "@site/static/schemas/examples/object/additionalProperties.json"

function PlaygroundInner(): JSX.Element {
  let [userSchema, setUserSchema] = React.useState({
    // To help monaco editor for JSON Schema definition
    $schema: "http://json-schema.org/draft-07/schema",
    // The demo schema
    ...DefaultSchema,
  } as { [x: string]: any })
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
            // For some reason, monaco editor can ignore empty schema when $schema is provided
            schema={{}}
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
