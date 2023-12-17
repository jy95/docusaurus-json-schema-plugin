import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

// Type for react-test-renderer
import type { ReactTestRenderer } from "react-test-renderer"

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
    // render the component
    let root: ReactTestRenderer | undefined

    await act(async () => {
      root = create(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
