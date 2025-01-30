import React from "react"
import { render, act } from "@testing-library/react"
import { expect, test, describe } from "@jest/globals"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { RenderResult } from "@testing-library/react"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: JSONSchema[] = [
  // Test scenario that combines both Draft 2019-09 / Draft 2020-12
  // https://json-schema.org/draft/2020-12/release-notes#dynamicref-and-dynamicanchor
  {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://example.com/tree",
    $dynamicAnchor: "node",
    $recursiveAnchor: true,
    type: "object",
    properties: {
      data: true,
      children: {
        type: "array",
        items: { $dynamicRef: "#node", $recursiveRef: "#" },
      },
    },
  },
]

describe("JSONSchemaViewer - References cases", () => {
  test.each(testcases)("test %#", async (fakeSchema) => {
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
