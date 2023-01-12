import React, {
  ReactNode,
  DetailedHTMLProps,
  DetailsHTMLAttributes,
} from "react"

// For collapse component
function Collapsible(props: {
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

export default Collapsible
