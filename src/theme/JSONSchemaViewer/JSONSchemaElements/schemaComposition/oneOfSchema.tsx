import React from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "@theme/JSONSchemaViewer/components"

import { GenerateFriendlyName } from "@theme/JSONSchemaViewer/utils"

import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

export default function OneOfSchema(props: Props): JSX.Element {
  const { schema } = props

  let typedSchema = schema.oneOf!
  let typeOf = "oneOf"

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <Tabs>
        {typedSchema.map((compositeSchema, index) => {
          return (
            <TabItem
              key={`schema_${typeOf}_${index}`}
              value={`schema_${typeOf}_${index}`}
              label={<GenerateFriendlyName schema={compositeSchema} />}
            >
              <CreateNodes schema={compositeSchema} />
            </TabItem>
          )
        })}
      </Tabs>
    </div>
  )
}
