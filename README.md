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
npm install docusaurus-json-schema-plugin --prefer-dedupe
```

> ⚠️ Why `--prefer-dedupe` ? Because of [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html) common issue in projets

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
// import { useColorMode } from "@docusaurus/theme-common"

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

  // https://docusaurus.io/docs/api/themes/configuration#use-color-mode
  return (
    <Layout
      title={`My super JSON Schema`}
      description="Description will go into a meta tag in <head />"
    >
      {/* You can "useColorMode" if you want to take into account current Docusaurus color */}
      <JSONSchemaEditor schema={mySchema} theme={"vs-dark"} />
    </Layout>
  )
}
```

## Swizzling components

```bash
npm run swizzle docusaurus-json-schema-plugin [component name]
```

## Unsupported JSON Schema features in JSONSchemaViewer

As you might have guessed, supporting several versions is a challenging topic.  
A few selected keywords are unsupported for the time being :

| Specification   | keyword                   | Reason    |
|-----------------|---------------------------|-----------|
| [Draft 4](https://json-schema.org/specification-links.html#draft-4) | [dependencies](https://datatracker.ietf.org/doc/html/draft-fge-json-schema-validation-00#section-5.4.5) | Deprecated in [2019-09](https://json-schema.org/draft/2019-09/release-notes.html) in favour of dependentRequired / dependentSchemas - is it worthy to spend time on deprecated feature ? |
| [Draft-07](https://json-schema.org/draft-07/json-schema-release-notes.html) | [if-then-else](https://json-schema.org/draft-07/json-schema-validation.html#rfc.section.6.6) | While quite interesting to have, it requires a proper thinking on how to make them human friendly |
| [2019-09](https://json-schema.org/draft/2019-09/release-notes.html)          | [unevaluatedItems](https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.9.3.1.3)      | Hard to understand for most people |
| [2019-09](https://json-schema.org/draft/2019-09/release-notes.html)  | [unevaluatedProperties](https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.9.3.2.4) | Hard to understand for most people  |
| [2019-09](https://json-schema.org/draft/2019-09/release-notes.html)  | [dependentRequired](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.5.4) | Not yet planned  |
| [2019-09](https://json-schema.org/draft/2019-09/release-notes.html)  | [dependentSchemas](https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.9.2.2.4) | Not yet planned  |

If you wish to see them covered, consider to contribute to the project ;)

## Credits

Special thanks to @PaloAltoNetworks (Palo Alto Networks), the author of [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs), which this project took some inspirations as a starting base.

## Contributors

<a href="https://github.com/jy95/docusaurus-json-schema-plugin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jy95/docusaurus-json-schema-plugin" />
</a>
