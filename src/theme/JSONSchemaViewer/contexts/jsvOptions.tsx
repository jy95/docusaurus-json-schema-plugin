import { useContext, createContext } from "react"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"
import type { CheckKey } from "@theme/JSONSchemaViewer/utils/QualifierMessages"

export type JSVOptions = {
  // Full schema, useful for some specifics $ref cases (recursive / anchors / ...)
  fullSchema: JSONSchema
  /**
   * Should we display "examples" ?
   * @default false
   */
  showExamples?: boolean
  /**
   * To overwrite the order to display qualifier messages
   * @default ["nullable","deprecated","readOnly","writeOnly","enum","stringLength","objectProperties","no-extra-properties","arrayItems","arrayContains","no-extra-items","number-range","pattern","multipleOf","uniqueItems","contentEncoding","contentMediaType","contentSchema","default","const","examples"]
   */
  qualifierMessagesOrder?: CheckKey[]
  /**
   * To overwrite the printout of "description"
   * By default, print out as provided
   * @default undefined
   */
  DescriptionComponent?: (params: { description: string }) => JSX.Element
  /**
   * To overwrite the printout of "examples", "default", "const", and "enum"
   * By default, print out as provided
   * @default undefined
   */
  ValueComponent?: (params: { value: unknown }) => JSX.Element
}

export const JSVOptionsContext = createContext<JSVOptions>({
  fullSchema: false,
  showExamples: false,
  qualifierMessagesOrder: undefined,
  DescriptionComponent: undefined,
})

export const useJSVOptionsContext = () => useContext(JSVOptionsContext)

export const JSVOptionsContextProvider = JSVOptionsContext.Provider
