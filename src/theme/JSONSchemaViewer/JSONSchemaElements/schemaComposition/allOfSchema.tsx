import React from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "../../components/index"

import { GenerateFriendlyName } from "../../utils/index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

function allOfSchema(props: Props): JSX.Element {
  const { schema } = props

  let typedSchema = schema.allOf!

  let typeOf = "allOf"

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

export default allOfSchema
