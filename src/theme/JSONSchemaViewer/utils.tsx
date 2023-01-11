import React, {
  ReactNode,
  DetailedHTMLProps,
  DetailsHTMLAttributes,
} from "react"

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

import type { JSONSchema7 } from "json-schema"

// To keep the same type everywhere here
type CommonSchemaType = Omit<JSONSchema7, "allOf">

// https://stackoverflow.com/a/69328045/6149867
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

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

// To handle Schema Composition (anyOf, oneOf)
// Remind that thanks prefiltering, we don't have to handle allOf case
export function renderAnyOneOf(
  schema:
    | WithRequired<CommonSchemaType, "oneOf">
    | WithRequired<CommonSchemaType, "anyOf">
): JSX.Element {
  let typeOf = schema.oneOf ? "oneOf" : "anyOf"

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <Tabs>{/** TODO  */}</Tabs>
    </div>
  )
}
