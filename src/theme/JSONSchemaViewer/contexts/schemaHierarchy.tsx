import { useContext, createContext } from "react"

export type SchemaHierarchy = {
  /**
   * JSON Pointer of the current element
   * @default ""
   */
  jsonPointer: string
  /**
   * the level order in the JSON Schema tree
   * @default 0
   */
  level: number
}

export const SchemaHierarchyContext = createContext<SchemaHierarchy>({
  jsonPointer: "",
  level: 0,
})

export const useSchemaHierarchyContext = () =>
  useContext(SchemaHierarchyContext)

export const SchemaHierarchyContextProvider = SchemaHierarchyContext.Provider
