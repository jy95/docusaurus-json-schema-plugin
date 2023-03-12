// Plugin config
declare module "docusaurus-json-schema-plugin" {
  import type { Plugin } from "@docusaurus/types"
  import type { PluginOptions } from "docusaurus-json-schema-plugin/src/index"

  export default function themeJSONSchema(
    options: PluginOptions
  ): Plugin<undefined>
}

// Viewer component
declare module "@theme/JSONSchemaViewer" {
  import type { Props } from "docusaurus-json-schema-plugin/src/theme/JSONSchemaViewer/index"

  export default function JSONSchemaViewer(props: Props): JSX.Element
}

// Editor component
declare module "@theme/JSONSchemaEditor" {
  import type { Props } from "docusaurus-json-schema-plugin/src/theme/JSONSchemaEditor/index"

  export default function JSONSchemaEditor(props: Props): JSX.Element
}

// MonacoEditor component
declare module "@theme/MonacoEditor" {
  import type { Props } from "docusaurus-json-schema-plugin/src/theme/MonacoEditor/index"

  export default function MonacoEditor(props: Props): JSX.Element

  export type {
    MonacoEditorTypes,
    Props,
  } from "docusaurus-json-schema-plugin/src/theme/MonacoEditor/index"

  // Re-export Monaco own interface, in case people want to add custom validation, ...
  export const monaco = import("monaco-editor/esm/vs/editor/editor.api")
}
