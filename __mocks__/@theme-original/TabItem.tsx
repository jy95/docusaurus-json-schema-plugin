import React, { ReactNode } from "react"

import type { JSX } from "react"

export type Props = {
  readonly children: ReactNode
  readonly hidden?: boolean
  readonly className?: string
  readonly default?: boolean
  readonly label?: string
}

export default function TabItem({ children, hidden }: Props): JSX.Element {
  return (
    <div role="tabpanel" {...{ hidden }}>
      {children}
    </div>
  )
}
