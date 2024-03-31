import React, { type ComponentProps, type ReactElement } from "react"
import { Collapsible } from "./Collapsible"

type DetailsProps = {
  /**
   * Summary is provided as props, optionally including the wrapping
   * `<summary>` tag
   */
  summary?: ReactElement | string
} & ComponentProps<"details">

export default function Details({
  summary,
  children,
  ...props
}: DetailsProps): JSX.Element {
  return (
    <details {...props}>
      {summary !== undefined && summary}
      {summary === undefined && <strong>Fallback</strong>}
      <Collapsible>
        <div>{children}</div>
      </Collapsible>
    </details>
  )
}
