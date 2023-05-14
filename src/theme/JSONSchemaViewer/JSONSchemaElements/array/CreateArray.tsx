import React from "react"

import Items from "@theme/JSONSchemaViewer/JSONSchemaElements/array/Items"
import Contains from "@theme/JSONSchemaViewer/JSONSchemaElements/array/Contains"
import PrefixItems from "@theme/JSONSchemaViewer/JSONSchemaElements/array/PrefixItems"
import AdditionalItems from "@theme/JSONSchemaViewer/JSONSchemaElements/array/AdditionalItems"
import UnevaluatedItems from "@theme/JSONSchemaViewer/JSONSchemaElements/array/UnevaluatedItems"

import { QualifierMessages } from "@theme/JSONSchemaViewer/utils/index"

import { useJSVOptionsContext } from "@theme/JSONSchemaViewer/contexts/index"

import { ArrayLabel, TypeLabel } from "@theme/JSONSchemaViewer/labels/index"

import { CreateDescription } from "@theme/JSONSchemaViewer/JSONSchemaElements/index"

import type { JSONSchemaNS } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: JSONSchemaNS.Array
  nullable?: boolean
  description?: string
  [x: string]: any
}

export default function CreateArray(props: Props): JSX.Element {
  const { schema, nullable, description } = props
  const options = useJSVOptionsContext()

  return (
    <>
      <TypeLabel />
      &nbsp;&#58;&nbsp;
      <ArrayLabel />
      <PrefixItems schema={schema} />
      <Items schema={schema} />
      <AdditionalItems schema={schema} />
      <UnevaluatedItems schema={schema} />
      <Contains schema={schema} />
      <div style={{ marginTop: "var(--ifm-table-cell-padding)" }}>
        <QualifierMessages
          schema={schema}
          options={options}
          nullable={nullable}
        />
      </div>
      {description !== undefined && (
        <CreateDescription description={description} />
      )}
    </>
  )
}
