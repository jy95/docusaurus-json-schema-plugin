import React from "react"

import { JSONSchema } from "json-schema-typed"
import { JSVOptions } from "../../contexts"
import Translate from "@docusaurus/Translate"

type Props = {
  schema: Exclude<JSONSchema, true | false>
  options: JSVOptions
  nullable?: boolean
}

export default function UnsolvedRefsQM(props: Props): JSX.Element {
  const {
    schema,
    options: { UnresolvedRefsComponent },
  } = props

  // Translated label
  const unsolvedRefLabel = (
    <strong>
      <Translate
        values={{
          id: "json-schema.labels.unsolvedRefs",
        }}
      >
        {"Unsolved ref(s) :"}
      </Translate>
    </strong>
  )

  // Unsolved ref(s)
  // Technically speak, nothing prevents people to combine $ref / $dynamicRef / $recursiveRef / ..
  // So generic approach instead
  let unsolvedRefValue: string = [
    schema.$ref,
    schema.$dynamicRef,
    (schema as any).$recursiveRef,
  ]
    .filter((s) => s !== undefined)
    .join(" ")

  return (
    <div key={"unsolvedRefs"}>
      {UnresolvedRefsComponent ? (
        <UnresolvedRefsComponent schema={schema} />
      ) : (
        <>
          {unsolvedRefLabel}
          &nbsp;
          {unsolvedRefValue}
        </>
      )}
    </div>
  )
}
