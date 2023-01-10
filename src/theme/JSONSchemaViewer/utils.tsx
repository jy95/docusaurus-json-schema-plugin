import React, {
  ReactNode,
  DetailedHTMLProps,
  DetailsHTMLAttributes,
} from "react"

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

import type { JSONSchema7 } from "json-schema"

// To keep the same type everywhere here
type cleanSchema = Omit<JSONSchema7, "allOf">

// For collapse component
export function Collapsible(props: {
  summary: ReactNode
  children: ReactNode
  detailsProps?: DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement
  >
}): JSX.Element {
  const { summary, children, detailsProps } = props

  return (
    <details {...detailsProps}>
      <summary>{summary}</summary>
      {children}
    </details>
  )
}
