import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type {
  JSONSchema,
  JSONSchemaNS,
} from "../../src/theme/JSONSchemaViewer/types"

// Type for react-test-renderer
import type { ReactTestRenderer } from "react-test-renderer"

const testcases: [string, JSONSchema][] = [
  [
    "Prefer title",
    {
      type: "array",
      prefixItems: [
        {
          title: "My custom title",
          type: "object",
          properties: {
            text: {
              const: "Hello World",
            },
          },
        },
      ],
    } as JSONSchemaNS.Array,
  ],
  [
    "Number without explicit type",
    {
      type: "array",
      prefixItems: [
        {
          multipleOf: 10,
        },
      ],
    } as JSONSchemaNS.Array,
  ],
  [
    "Object without explicit type",
    {
      type: "array",
      prefixItems: [
        {
          minProperties: 3,
        },
      ],
    } as JSONSchemaNS.Array,
  ],
  [
    "Multiple types",
    {
      type: "array",
      prefixItems: [
        {
          type: ["null", "number"],
        },
      ],
    } as JSONSchemaNS.Array,
  ],
  [
    "Not (integer)",
    {
      type: "array",
      prefixItems: [
        {
          not: {
            type: "integer",
          },
        },
      ],
    } as JSONSchemaNS.Array,
  ],
  [
    "OR / XOR / AND",
    {
      type: "array",
      prefixItems: [
        {
          anyOf: [
            { type: "string", maxLength: 5 },
            { type: "number", minimum: 0 },
          ],
        },
        {
          oneOf: [
            { type: "number", multipleOf: 5 },
            { type: "number", multipleOf: 3 },
          ],
        },
        {
          allOf: [{ type: "string" }, { maxLength: 5 }],
        },
      ],
    } as JSONSchemaNS.Array,
  ],
]

describe("JSONSchemaViewer - generateFriendlyName cases", () => {
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
