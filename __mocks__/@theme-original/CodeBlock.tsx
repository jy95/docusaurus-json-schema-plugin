import React, { ReactNode } from "react"

import type { JSX } from "react"

type Props = {
  children: ReactNode
  language?: string
}

export default function CodeBlock({ children }: Props): JSX.Element {
  // Keep it simple, as lib is not using advanced feature
  let rawString =
    typeof children === "string" ? children : JSON.stringify(children)

  return <code>{rawString}</code>
}
