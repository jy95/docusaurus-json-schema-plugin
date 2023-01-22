<h1 align="center">Docusaurus JSON Schema Plugin</h1>

<div align="center">
<img width="200" src="https://user-images.githubusercontent.com/9343811/165975569-1bc29814-884c-4931-83df-860043b625b7.svg" />
</div>

<div align="center">

JSON Schema viewer / editor in Docusaurus v2.

<img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&logo=meta&color=blueviolet&label=Docusaurus&query=peerDependencies%5B%22%40docusaurus%2Fcore%22%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2Fjy95%2Fdocusaurus-json-schema-plugin%2Fmain%2Fpackage.json" />
<br/><br/>

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://github.com/jy95/docusaurus-json-schema-plugin/blob/main/LICENSE) [![npm latest package](https://img.shields.io/npm/v/docusaurus-json-schema-plugin/latest.svg)] [![npm downloads](https://img.shields.io/npm/dm/docusaurus-json-schema-plugin.svg)] [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jy95/docusaurus-json-schema-plugin/blob/main/CONTRIBUTING.md)
<br />

</div>



---

## Overview


## Installation

```bash
npm install docusaurus-json-schema-plugin
```

## Configuring `docusaurus.config.js`

```js
// docusaurus.config.js

{
    themes: ["docusaurus-json-schema-plugin"], // Allows use of @theme/JSONSchemaEditor or @theme/JSONSchemaViewer
}

```

## Usage

### JSONSchemaViewer

> Component to display a JSON Schema in a human friendly way

#### API

| Property        | Type          | Required  | Note                     |
|-----------------|---------------|-----------|--------------------------|
| schema          | JSONSchema7   | Mandatory | JSON Schema Draft-07     |
| resolverOptions | IResolverOpts | Optional  | To resolve your $ref (by default, only inline references will be dereferenced). More info on [@stoplight/json-ref-resolver](https://github.com/stoplightio/json-ref-resolver)  |

#### Example 
```tsx
import React from "react"
import Layout from "@theme/Layout"
import JSONSchemaViewer from "@theme/JSONSchemaViewer"

function ExamplePage(): JSX.Element {

  // You are free to fetch your schema in your own way (load local file, fetch, ...) :)
  const mySchema = {
    "type": "object",
    "properties": {
      "builtin": {
        "type": "number"
      }
    },
    "patternProperties": {
      "^S_": {
        "type": "string"
      },
      "^I_": {
        "type": "integer"
      }
    },
    "additionalProperties": {
      "type": "string"
    }
  }

  return (
    <Layout
      title={`My super JSON Schema`}
      description="Description will go into a meta tag in <head />"
    >
      <JSONSchemaViewer schema={mySchema} />
    </Layout>
  )
}
```

### JSONSchemaEditor

> Component to learn within a editor with autocomplete, validation, ...

⚠️As this component uses `useColorMode`, don't forget to take into account https://docusaurus.io/docs/api/themes/configuration#use-color-mode 

#### API

| Property        | Type              | Required  | Note                                               |
|-----------------|-------------------|-----------|----------------------------------------------------|
| schema          | JSONSchema        | Mandatory | JSON Schema supported by [monaco-editor](https://github.com/microsoft/monaco-editor), which powers [VS Code](https://code.visualstudio.com/Docs/languages/json#_json-schemas-and-settings) - Currently, it supports all draft versions from Draft 4 to JSON Schema Draft 2020-12  |
| ....            | MonacoEditorProps | Optional  | [Properties](https://github.com/react-monaco-editor/react-monaco-editor#properties) of [react-monaco-editor](https://github.com/react-monaco-editor/react-monaco-editor) | 

#### Example
```tsx
import React from "react"
import Layout from "@theme/Layout"
import JSONSchemaEditor from "@theme/JSONSchemaEditor"

function ExamplePage(): JSX.Element {

  // You are free to fetch your schema in your own way (load local file, fetch, ...) :)
  const mySchema = {
    "type": "object",
    "properties": {
      "builtin": {
        "type": "number"
      }
    },
    "patternProperties": {
      "^S_": {
        "type": "string"
      },
      "^I_": {
        "type": "integer"
      }
    },
    "additionalProperties": {
      "type": "string"
    }
  }

  return (
    <Layout
      title={`My super JSON Schema`}
      description="Description will go into a meta tag in <head />"
    >
      <JSONSchemaEditor schema={mySchema} />
    </Layout>
  )
}
```

## Swizzling components

```bash
npm run swizzle docusaurus-json-schema-plugin [component name]
```

## Credits

Special thanks to @PaloAltoNetworks (Palo Alto Networks), the author of [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs), which this project took some inspirations as a starting base.

## Contributors

<a href="https://github.com/jy95/docusaurus-json-schema-plugin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jy95/docusaurus-json-schema-plugin" />
</a>
