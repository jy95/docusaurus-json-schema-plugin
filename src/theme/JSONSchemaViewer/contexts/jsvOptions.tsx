import { useContext, createContext } from "react"

import type { JSONSchema } from "../types"
import type { CheckKey } from "../utils/QualifierMessages/index"

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
}

export const JSVOptionsContext = createContext<JSVOptions>({
  fullSchema: false,
  showExamples: false,
  qualifierMessagesOrder: undefined,
})

export const useJSVOptionsContext = () => useContext(JSVOptionsContext)

export const JSVOptionsContextProvider = JSVOptionsContext.Provider
