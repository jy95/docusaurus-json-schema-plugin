import React, {
  ReactNode,
  DetailedHTMLProps,
  DetailsHTMLAttributes,
} from "react"

// import Details from "@theme-original/Details"
import Details from "@theme-original/Details"

// For collapse component
export default function Collapsible(props: {
  summary: ReactNode
  children: ReactNode
  detailsProps?: DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement
  >
}): JSX.Element {
  const { summary, children, detailsProps } = props

  return (
    <Details summary={<summary>{summary}</summary>} {...detailsProps}>
      {children}
    </Details>
  )
}
