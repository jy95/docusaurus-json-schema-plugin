import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render, act } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"
import type { RenderResult } from "@testing-library/react"


const testcases: JSONSchema[] = [
  { type: "array" },
  { type: "array", contains: { type: "number" } },
  { type: "array", items: { type: "number" } },
  { type: "array", minItems: 2, maxItems: 3 },
  { type: "array", contains: { type: "integer" }, minContains: 2, maxContains: 3 },
  {
    type: "array",
    description: "Represent a street address such as ['1600','Pennsylvania','Avenue','NW']",
    items: false,
    prefixItems: [
      { type: "number", description: "The address number" },
      { type: "string", description: "The name of the street" },
      { enum: ["Street", "Avenue", "Boulevard"], description: "The type of street" },
      { enum: ["NW", "NE", "SW", "SE"], description: "The city quadrant of the address" },
    ],
  },
  { type: "array", uniqueItems: true },
  { minItems: 1 },
  { maxItems: 5 },
  { maxContains: 3 },
  { minContains: 2 },
  { type: "array", items: [{ type: "integer" }, { type: "string" }], minItems: 1 },
  { type: "array", prefixItems: [{ type: "number" }, { type: "string" }], minItems: 3 },
  { type: "array", items: { type: "string" }, minItems: 1 },
  { unevaluatedItems: false },
  { type: "array", items: [{ type: "integer" }, { type: "string" }], additionalItems: { type: "boolean" }, minItems: 2 },
  { type: "array", prefixItems: [{ type: "string" }], unevaluatedItems: { type: "number" } },
]

describe("JSONSchemaViewer - Array type", () => {
  test.each(testcases)("test %#", async (fakeSchema) => {
    let result: RenderResult | null = null

    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    expect(result!.asFragment()).toMatchSnapshot()
  })
})