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
    "allOf",
    {
      allOf: [{ type: "string" }, { maxLength: 5 }],
    },
  ],
  [
    "anyOf",
    {
      anyOf: [
        { type: "string", maxLength: 5 },
        { type: "number", minimum: 0 },
      ],
    },
  ],
  [
    "not",
    {
      not: { type: "string" },
    },
  ],
  [
    "oneOf",
    {
      oneOf: [
        { type: "number", multipleOf: 5 },
        { type: "number", multipleOf: 3 },
      ],
    },
  ],
]

describe("JSONSchemaViewer - schema composition", () => {
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
