import React from "react"

import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts/index"

type Props = {
  description: string
}

export default function CreateDescription(props: Props): JSX.Element {
  const { description } = props
  const { DescriptionComponent } = useJSVOptionsContext()

  return (
    <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
      {DescriptionComponent ? (
        <DescriptionComponent description={description} />
      ) : (
        description
      )}
    </div>
  )
}
