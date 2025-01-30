import React from "react"
import { render, act } from "@testing-library/react"
import { expect, test, describe } from "@jest/globals"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { RenderResult } from "@testing-library/react"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: [string, JSONSchema][] = [
  [
    "single type",
    {
      type: "number",
    },
  ],
  [
    "2 types",
    {
      type: ["number", "string"],
    },
  ],
  [
    "4 types",
    {
      type: ["null", "string", "integer", "boolean"],
      description: "null | string | integer | boolean",
    },
  ],
  ["Unspecified type (boolean)", true],
  [
    "Unspecified type (numeric)",
    {
      multipleOf: 10,
    },
  ],
  [
    "Unspecified multiple types",
    {
      minLength: 5,
      minimum: 42,
      maxLength: 3,
    },
  ],
]

describe("JSONSchemaViewer - type", () => {
  test.each(testcases)("test %s", async (title, fakeSchema) => {
    // Render the component
    let rendered: RenderResult | null = null

    // Use act to ensure all updates are processed
    await act(async () => {
      rendered = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // Capture the snapshot
    expect(rendered!.asFragment()).toMatchSnapshot()
  })
})
