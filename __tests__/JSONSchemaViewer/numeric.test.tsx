import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

// Type for react-test-renderer
import type { ReactTestRenderer } from "react-test-renderer"

const testcases: [string, JSONSchema][] = [
  [
    "integer",
    {
      type: "integer",
    },
  ],
  [
    "multipleOf",
    {
      type: "integer",
      multipleOf: 10,
    },
  ],
  [
    "number",
    {
      type: "number",
    },
  ],
  [
    "ranges (1)",
    {
      type: "number",
      minimum: 0,
      exclusiveMaximum: 100,
    },
  ],
  [
    "ranges (2)",
    {
      type: "number",
      exclusiveMinimum: 1,
      maximum: 100,
    },
  ],
  [
    "ranges (3)",
    {
      type: "number",
      exclusiveMinimum: 1,
    },
  ],
  [
    "ranges (4)",
    {
      type: "number",
      exclusiveMaximum: 1,
    },
  ],
]

describe("JSONSchemaViewer - numeric", () => {
  test.each(testcases)("test %s", async (_title, fakeSchema) => {
    // render the component
    let root: ReactTestRenderer | undefined

    await act(async () => {
      root = create(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
