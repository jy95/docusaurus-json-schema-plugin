import React from "react"
import { render, act } from "@testing-library/react"
import { expect, test, describe } from "@jest/globals"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { RenderResult } from "@testing-library/react";
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: [string, JSONSchema][] = [
  [
    "allOf",
    {
      allOf: [{ type: "string" }, { maxLength: 5 }],
    },
  ],
  [
    "anyOf",
    {
      anyOf: [
        { type: "string", maxLength: 5 },
        { type: "number", minimum: 0 },
      ],
    },
  ],
  [
    "not",
    {
      not: { type: "string" },
    },
  ],
  [
    "oneOf",
    {
      oneOf: [
        { type: "number", multipleOf: 5 },
        { type: "number", multipleOf: 3 },
      ],
    },
  ],
]

describe("JSONSchemaViewer - schema composition", () => {
  test.each(testcases)("test %s", async (title, fakeSchema) => {
    // Render the component
    let rendered: RenderResult | null = null;
    
    // Use act to ensure all updates are processed
    await act(async () => {
      rendered = render(<JSONSchemaViewer schema={fakeSchema} />);
    });

    // Capture the snapshot
    expect(rendered!.asFragment()).toMatchSnapshot();
  })
})
