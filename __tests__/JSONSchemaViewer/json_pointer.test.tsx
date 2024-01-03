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
    "Object properties - like street_address",
    {
      $id: "https://example.com/schemas/address",
      type: "object",
      properties: {
        street_address: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["street_address", "city", "state"],
    },
  ],
  [
    "Array Properties - like /prefixItems/3",
    {
      type: "array",
      prefixItems: [
        { type: "number" },
        { type: "string" },
        { enum: ["Street", "Avenue", "Boulevard"] },
        { enum: ["NW", "NE", "SW", "SE"] },
      ],
    },
  ],
  [
    "Escaped attribute - like country/state should give /properties/country~1state",
    {
      $id: "https://example.com/schemas/address",
      type: "object",
      properties: {
        street_address: { type: "string" },
        city: { type: "string" },
        "country/state": { type: "string" },
      },
      required: ["street_address", "city", "state"],
    },
  ],
]

describe("JSONSchemaViewer - JSON Pointer", () => {
  test.each(testcases)("test %s", async (_title, fakeSchema) => {
    // render the component
    let root: ReactTestRenderer | undefined

    await act(async () => {
      root = create(
        <JSONSchemaViewer
          schema={fakeSchema}
          viewerOptions={{ showExamples: true }}
        />,
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
