import React from "react"

import { CreateNodes } from "../../components/index"

import type { JSONSchema } from "../../types"

type Props = {
  schema: JSONSchema
  [x: string]: any
}

function oneOfSchema(props: Props): JSX.Element {
  const { schema } = props

  if (schema === undefined) {
    return <></>
  }

  let typeOf = "not"

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <br />
      <CreateNodes schema={schema} />
    </div>
  )
}

export default oneOfSchema
