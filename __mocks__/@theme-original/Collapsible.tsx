import React, { type ReactNode } from "react"

import type { JSX } from "react"

// As it is just a mock, I defintely do not need a state of the art implementation
export function Collapsible({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return <div>{children}</div>
}
