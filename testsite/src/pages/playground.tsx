import React from "react"
import Layout from "@theme/Layout"
//import { useColorMode } from "@docusaurus/theme-common"
import BrowserOnly from "@docusaurus/BrowserOnly"

// You might say : Why the draft-07 in the playground ? Well several reasons :
// 1. Monaco editor can understand that better & suggest autocomplete
// 2. Monaco editor didn't at this time fully integrate 2020-12
// 3. AJV uses by default Draft-07
import ValidJSONSchema from "@site/static/specs/draft-07-schema.json";

import type {DetailedHTMLProps, ButtonHTMLAttributes} from "react";

type PropsButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

function ButtonExample(props: PropsButton): JSX.Element {
    return (
        <button
        {...props}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: 'solid red',
          borderRadius: 20,
          padding: 10,
          cursor: 'pointer',
          ...props.style,
        }}
      />
    )
}

function PlaygroundInner(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const JSONSchemaViewer = require("@theme/JSONSchemaViewer").default
        const JSONSchemaEditor = require("@theme/JSONSchemaEditor").default
        //const { colorMode } = useColorMode()
        //const Schema = {}

        return (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonExample>Regenerate JSON Schema Editor &amp; JSON Schema Viewer</ButtonExample>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ boxSizing: "border-box", width: "50%" }}>
                <h1>Schema</h1>
                <JSONSchemaEditor
                  schema={ValidJSONSchema}
                  onChange={(newValue) => {
                    console.log(newValue);
                  }}
                />
              </div>
              <div style={{ boxSizing: "border-box", width: "50%" }}>
                <h1>JSON Schema Editor</h1>
                {/*<JSONSchemaEditor
                  schema={Schema}
                  theme={colorMode === "dark" ? "vs-dark" : "vs"}
                />*/}
              </div>
            </div>
            <div>
              <h1>JSON Schema Viewer</h1>
              {/*<JSONSchemaViewer schema={Schema} />*/}
            </div>
          </>
        )
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
      <PlaygroundInner />
    </Layout>
  )
}
