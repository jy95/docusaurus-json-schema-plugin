import React from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import { CreateNodes } from "@theme/JSONSchemaViewer/components"
import { SchemaHierarchyComponent } from "@theme/JSONSchemaViewer/contexts"

import { GenerateFriendlyName } from "@theme/JSONSchemaViewer/utils"

import type { JSX } from "react"
import type { JSONSchema } from "@theme/JSONSchemaViewer/types"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  [x: string]: any
}

export default function AllOfSchema(props: Props): JSX.Element {
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
              <SchemaHierarchyComponent innerJsonPointer={`/allOf/${index}`}>
                <CreateNodes schema={compositeSchema} />
              </SchemaHierarchyComponent>
            </TabItem>
          )
        })}
      </Tabs>
    </div>
  )
}
