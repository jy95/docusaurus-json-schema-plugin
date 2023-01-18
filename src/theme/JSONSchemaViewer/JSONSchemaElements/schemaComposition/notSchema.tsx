import React from "react"

import { CreateNodes } from "../../components/index"

import type { JSONSchema7Definition } from "json-schema"

type Props = {
  schema: JSONSchema7Definition
  [x: string]: any
}

function oneOfSchema(props: Props): JSX.Element {
  const { schema } = props

  if (schema === undefined) {
    ;<></>
  }

  let typeOf = "not"

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <CreateNodes schema={schema} />
    </div>
  )
}

export default oneOfSchema
