import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render, act } from "@testing-library/react"
import type { RenderResult } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type {
  JSONSchema,
  JSONSchemaNS,
} from "../../src/theme/JSONSchemaViewer/types"

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
    "Array specified with items and contains",
    {
      type: "array",
      prefixItems: [
        {
          items: [
            {
              type: "number",
            },
          ],
          contains: {
            type: "string",
          },
        },
      ],
    } as JSONSchemaNS.Array,
  ],
]

describe("JSONSchemaViewer - generateFriendlyName cases", () => {
  test.each(testcases)("test %s", async (_title, fakeSchema) => {
    let result: RenderResult | null = null

    // Render the component within act
    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // Capture the snapshot
    expect(result!.asFragment()).toMatchSnapshot()
  })
})
