import React from "react";
import { expect, test, describe } from "@jest/globals";
import { render, act } from "@testing-library/react";
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index";

// Type to prevent creating invalid mocks
import type { RenderResult } from "@testing-library/react";
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types";

const testcases: [string, JSONSchema][] = [
  [
    "simple",
    {
      type: "object",
      description: "A simple object",
    },
  ],
  [
    "minProperties",
    {
      type: "object",
      minProperties: 2,
    },
  ],
  [
    "maxProperties",
    {
      type: "object",
      maxProperties: 3,
    },
  ],
  [
    "minProperties & maxProperties",
    {
      type: "object",
      minProperties: 2,
      maxProperties: 3,
    },
  ],
  [
    "additionalProperties (false)",
    {
      type: "object",
      properties: {
        number: { type: "number" },
        street_name: { type: "string" },
        street_type: { enum: ["Street", "Avenue", "Boulevard"] },
      },
      additionalProperties: false,
    },
  ],
  [
    "additionalProperties (JSON Schema)",
    {
      type: "object",
      properties: {
        number: { type: "number" },
        street_name: { type: "string" },
        street_type: { enum: ["Street", "Avenue", "Boulevard"] },
      },
      additionalProperties: { type: "string" },
    },
  ],
  [
    "additionalProperties with patternProperties",
    {
      type: "object",
      properties: {
        builtin: { type: "number" },
      },
      patternProperties: {
        "^S_": { type: "string" },
        "^I_": { type: "integer" },
      },
      additionalProperties: { type: "string" },
    },
  ],
];

describe("JSONSchemaViewer - object", () => {
  test.each(testcases)("test %s", async (title: string, fakeSchema: JSONSchema) => {
    let rendered: RenderResult | null = null;

    // Use act to ensure all updates are processed
    await act(async () => {
      rendered = render(<JSONSchemaViewer schema={fakeSchema} />);
    });

    // Capture the snapshot
    expect(rendered!.asFragment()).toMatchSnapshot();
  });
});