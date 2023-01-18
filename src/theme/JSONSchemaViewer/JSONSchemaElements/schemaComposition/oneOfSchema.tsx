import React from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import type { JSONSchema7Definition } from "json-schema"

type Props = {
  schema: JSONSchema7Definition[]
  [x: string]: any
}

function oneOfSchema(props: Props): JSX.Element {
  const { schema } = props

  if (schema === undefined) {
    ;<></>
  }

  let typeOf = "oneOf"

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <Tabs>
        {schema.map((compositeSchema, index) => {
          const label =
            (typeof compositeSchema !== "boolean" && compositeSchema?.title) ||
            `${index + 1}`

          return (
            <TabItem
              key={`schema_${typeOf}_${index}`}
              value={`schema_${typeOf}_${index}`}
              label={label}
            >
              <CreateNodes schema={compositeSchema} />
            </TabItem>
          )
        })}
      </Tabs>
    </div>
  )
}

export default oneOfSchema
