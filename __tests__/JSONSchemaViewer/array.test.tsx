import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: JSONSchema[] = [
  {
    type: "array",
  },
  {
    type: "array",
    contains: {
      type: "number",
    },
  },
  {
    type: "array",
    items: {
      type: "number",
    },
  },
  {
    type: "array",
    minItems: 2,
    maxItems: 3,
  },
  {
    type: "array",
    contains: {
      type: "integer",
    },
    minContains: 2,
    maxContains: 3,
  },
  {
    type: "array",
    description:
      "Represent a street address such as ['1600','Pennsylvania','Avenue','NW']",
    items: false,
    prefixItems: [
      {
        type: "number",
        description: "The address number",
      },
      {
        type: "string",
        description: "The name of the street",
      },
      {
        enum: ["Street", "Avenue", "Boulevard"],
        description: "The type of street",
      },
      {
        enum: ["NW", "NE", "SW", "SE"],
        description: "The city quadrant of the address",
      },
    ],
  },
  {
    type: "array",
    uniqueItems: true,
  },
]

describe("JSONSchemaViewer - Array type", () => {
  test.each(testcases)("test %#", async (fakeSchema) => {
    // render the component
    let root: any

    await act(async () => {
      root = create(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
