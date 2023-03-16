import { useContext, createContext } from "react"

export type State = {
  // The current schema displayed
  userSchema: unknown
  // The current json pointer
  jsonPointer: string
}

export type Playground = {
  // state
  state: State
  // update function
  updateState: (_: Partial<State>) => void
}

export const PlaygroundContext = createContext<Playground>({
  state: {
    userSchema: {},
    jsonPointer: "",
  },
  updateState: () => {},
})

export const usePlaygroundContext = () => useContext(PlaygroundContext)

export const PlaygroundContextProvider = PlaygroundContext.Provider
