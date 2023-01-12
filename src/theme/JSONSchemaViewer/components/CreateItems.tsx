import React from "react"

import { RenderAnyOneOf, CreateNodes, CreateProperties } from "./index"

import type { JSONSchema7 } from "json-schema"
import type { WithRequired } from "./index"

function createItems(schema: WithRequired<JSONSchema7, "items">): JSX.Element {
  // TODO
  // Default
}

export default createItems
