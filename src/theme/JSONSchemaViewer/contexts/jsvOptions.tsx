import { useContext, createContext } from "react"

import type { JSONSchema } from "../types"

export type JSVOptions = {
  // Full schema, useful for some specifics $ref cases (recursive / anchors / ...)
  fullSchema: JSONSchema
  /**
   * Should we display "examples" ?
   * @default false
   */
  showExamples?: boolean
}

export const JSVOptionsContext = createContext<JSVOptions>({
  fullSchema: false,
  showExamples: false,
})

export const useJSVOptionsContext = () => useContext(JSVOptionsContext)

export const JSVOptionsContextProvider = JSVOptionsContext.Provider
