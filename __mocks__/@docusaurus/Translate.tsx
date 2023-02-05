import React from "react"

type Props = {
  [x: string]: any
  children: string
}

export default function Translate(props: Props): JSX.Element {
  // Return fallback message without translate that
  return <>{props.children}</>
}
