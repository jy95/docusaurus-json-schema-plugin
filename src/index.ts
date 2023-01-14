import { Plugin, LoadContext } from "@docusaurus/types"

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
