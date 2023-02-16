import React from "react"

import {
  ArrayLabel,
  ObjectLabel,
  StringLabel,
  NumberLabel,
  IntegerLabel,
  BooleanLabel,
  NullLabel,
} from "../labels/index"

import type { TypeValues } from "../types"

type Props = {
  type: TypeValues
  [x: string]: any
}

export default function TypeLabelSwitch(props: Props): JSX.Element {
  const { type, ...rest } = props
  switch (type) {
    case "string":
      return <StringLabel {...rest} />
    case "number":
      return <NumberLabel {...rest} />
    case "boolean":
      return <BooleanLabel {...rest} />
    case "object":
      return <ObjectLabel {...rest} />
    case "array":
      return <ArrayLabel {...rest} />
    case "integer":
      return <IntegerLabel {...rest} />
    case "null":
      return <NullLabel {...rest} />
    default:
      return <></>
  }
}
