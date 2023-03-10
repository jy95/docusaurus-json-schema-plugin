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
  test.each(testcases)("test %s", async (fakeSchema) => {
    // render the component
    let root: ReactTestRenderer | undefined

    await act(async () => {
      root = create(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
