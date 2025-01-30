import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render, act } from "@testing-library/react"
import type { RenderResult } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: [string, JSONSchema][] = [
  [
    "integer",
    {
      type: "integer",
      description: "A simple integer",
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
    let result: RenderResult | null = null

    // Render the component within act
    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // Capture the snapshot
    expect(result!.asFragment()).toMatchSnapshot()
  })
})
