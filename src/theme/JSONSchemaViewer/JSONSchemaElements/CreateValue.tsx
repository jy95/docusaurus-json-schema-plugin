import React from "react"

import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts"
import { printSchemaType } from "@theme/JSONSchemaViewer/utils/QualifierMessages"

type Props = {
  value: unknown
}

export default function CreateValue(props: Props): JSX.Element {
  const { value } = props
  const { ValueComponent } = useJSVOptionsContext()

  if (ValueComponent) {
    return <ValueComponent value={value} />
  }

  return printSchemaType(value)
}
