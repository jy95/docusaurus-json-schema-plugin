import React, {ReactNode} from "react"

type Props = {
  [x: string]: any
  children: string
  values?: {
    [x: string]: ReactNode
  }
}

export default function Translate(props: Props): JSX.Element {
  // Return fallback message with basic replacements (what matter is that)
  
  let replacedString = props.children;
  if (props.values) {
    Object
      .entries(props.values)
      .forEach( ([key, value]) => {
        // Well enough for the tests context 
        replacedString = replacedString.replace(new RegExp(`{${key}}`), value as string)
      })
  }
  return <>{replacedString}</>
}
