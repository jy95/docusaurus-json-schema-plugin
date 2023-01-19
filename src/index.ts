import { Plugin, LoadContext } from "@docusaurus/types"

// @ts-ignore Webpack plugin are mostly "required"
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

export interface PluginOptions {}

/**
 * The type of data your plugin loads.
 * This is set to never because the example doesn't load any data.
 */
export type MyPluginLoadableContent = never

export default function myPlugin(
  context: LoadContext,
  options: PluginOptions
): Plugin<MyPluginLoadableContent | PluginOptions> {
  return {
    // change this to something unique, or caches may conflict!
    name: "docusaurus-json-schema-plugin",

    // From https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md
    configureWebpack() {
      return {
        plugins: [new MonacoWebpackPlugin({
          // available options are documented at https://github.com/microsoft/monaco-editor/blob/main/webpack-plugin/README.md#option
          languages: ['json']
        })],
      }
    },

    getThemePath() {
      // Where compiled JavaScript output lives
      return "../lib/theme"
    },

    getTypeScriptThemePath() {
      // Where TypeScript source code lives
      return "../src/theme"
    },
  }
}
