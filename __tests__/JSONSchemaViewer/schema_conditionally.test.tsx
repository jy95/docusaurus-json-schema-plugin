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
    "dependencies (dependentRequired format)",
    {
      type: "object",

      properties: {
        name: { type: "string" },
        credit_card: { type: "number" },
        billing_address: { type: "string" },
      },

      required: ["name"],

      dependencies: {
        credit_card: ["billing_address"],
      },
    },
  ],
  [
    "dependencies (dependentSchemas format)",
    {
      type: "object",

      properties: {
        name: { type: "string" },
        credit_card: { type: "number" },
      },

      required: ["name"],

      dependencies: {
        credit_card: {
          properties: {
            billing_address: { type: "string" },
          },
          required: ["billing_address"],
        },
      },
    },
  ],
  [
    "dependentRequired",
    {
      type: "object",

      properties: {
        name: { type: "string" },
        credit_card: { type: "number" },
        billing_address: { type: "string" },
      },

      required: ["name"],

      dependentRequired: {
        credit_card: ["billing_address"],
      },
    },
  ],
  [
    "dependentRequired (bidirectional)",
    {
      type: "object",

      properties: {
        name: { type: "string" },
        credit_card: { type: "number" },
        billing_address: { type: "string" },
      },

      required: ["name"],

      dependentRequired: {
        credit_card: ["billing_address"],
        billing_address: ["credit_card"],
      },
    },
  ],
  [
    "If Then Else",
    {
      type: "object",
      properties: {
        street_address: {
          type: "string",
        },
        country: {
          default: "United States of America",
          enum: ["United States of America", "Canada"],
        },
      },
      if: {
        properties: { country: { const: "United States of America" } },
      },
      then: {
        properties: { postal_code: { pattern: "[0-9]{5}(-[0-9]{4})?" } },
      },
      else: {
        properties: {
          postal_code: { pattern: "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]" },
        },
      },
    },
  ],
  [
    "If Then Else (multiple)",
    {
      type: "object",
      properties: {
        street_address: {
          type: "string",
        },
        country: {
          default: "United States of America",
          enum: ["United States of America", "Canada", "Netherlands"],
        },
      },
      allOf: [
        {
          if: {
            properties: { country: { const: "United States of America" } },
          },
          then: {
            properties: { postal_code: { pattern: "[0-9]{5}(-[0-9]{4})?" } },
          },
        },
        {
          if: {
            properties: { country: { const: "Canada" } },
            required: ["country"],
          },
          then: {
            properties: {
              postal_code: { pattern: "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]" },
            },
          },
        },
        {
          if: {
            properties: { country: { const: "Netherlands" } },
            required: ["country"],
          },
          then: {
            properties: { postal_code: { pattern: "[0-9]{4} [A-Z]{2}" } },
          },
        },
      ],
    },
  ],
  [
    "dependentSchemas",
    {
      type: "object",
      dependentSchemas: {
        c: {
          type: "object",
          properties: {
            b: {
              type: "integer",
            },
          },
        },
      },
    },
  ],
]

describe("JSONSchemaViewer - schema conditionally", () => {
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
