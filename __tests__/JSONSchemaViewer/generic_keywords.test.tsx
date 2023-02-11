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
    "annotations",
    {
      title: "Match anything",
      description: "This is a schema that matches anything.",
      default: "Default value",
      examples: ["Anything", 4035],
      deprecated: true,
      readOnly: true,
      writeOnly: false,
    },
  ],
  [
    "const",
    {
      properties: {
        country: {
          const: "United States of America",
        },
      },
    },
  ],
  [
    "enum",
    {
      enum: ["red", "amber", "green"],
    },
  ],
]

describe("JSONSchemaViewer - Generic keywords", () => {
  test.each(testcases)("test %s", async (_title, fakeSchema) => {
    // render the component
    let root: ReactTestRenderer | undefined

    await act(async () => {
      root = create(
        <JSONSchemaViewer
          schema={fakeSchema}
          viewerOptions={{ showExamples: true }}
        />
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
