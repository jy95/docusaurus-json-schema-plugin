// Plugin config
declare module "docusaurus-json-schema-plugin" {
  import type { Plugin } from "@docusaurus/types"
  import type { PluginOptions } from "@src/index"

  export default function themeJSONSchema(
    options: PluginOptions
  ): Plugin<undefined>
}

// Viewer component
declare module "@theme/JSONSchemaViewer" {
  import type { Props } from "@theme/JSONSchemaViewer/index"

  export default function JSONSchemaViewer(props: Props): JSX.Element
}

// Editor component
declare module "@theme/JSONSchemaEditor" {
  import type { Props } from "@theme/JSONSchemaEditor/index"

  export default function JSONSchemaEditor(props: Props): JSX.Element
}
