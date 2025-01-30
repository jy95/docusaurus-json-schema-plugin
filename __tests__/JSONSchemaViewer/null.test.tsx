import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render, act } from "@testing-library/react"
import type { RenderResult } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: JSONSchema[] = [
  {
    type: "null",
    description: "A simple null example",
  },
  {
    enum: [null, "Some constant here ..."],
  },
]

describe("JSONSchemaViewer - null type", () => {
  test.each(testcases)("test %#", async (fakeSchema) => {
    let result: RenderResult | null = null

    // Render the component within act
    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // Capture the snapshot
    expect(result!.asFragment()).toMatchSnapshot()
  })
})
