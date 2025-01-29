import type { JSX } from "react"

// Plugin config
declare module "docusaurus-json-schema-plugin" {
  import type { Plugin } from "@docusaurus/types"
  import type { PluginOptions } from "docusaurus-json-schema-plugin/src"

  export default function themeJSONSchema(
    options: PluginOptions,
  ): Plugin<undefined>
}

// Viewer component
declare module "@theme/JSONSchemaViewer" {
  import type { Props } from "@theme/JSONSchemaViewer"

  export default function JSONSchemaViewer(props: Props): JSX.Element
}

// Editor component
declare module "@theme/JSONSchemaEditor" {
  import type { Props } from "@theme/JSONSchemaEditor"

  export default function JSONSchemaEditor(props: Props): JSX.Element
}

// MonacoEditor component
declare module "@theme/MonacoEditor" {
  import type { Props } from "@theme/MonacoEditor"

  export default function MonacoEditor(props: Props): JSX.Element
}
