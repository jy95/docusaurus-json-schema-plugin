import React from "react";
import { expect, test, describe } from "@jest/globals";
import { render } from "@testing-library/react";
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index";

// Type to prevent creating invalid mocks
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
  [
    "patternProperties",
    {
      type: "object",
      patternProperties: {
        "^S_": { type: "string" },
        "^I_": { type: "integer" },
      },
    },
  ],
  [
    "properties",
    {
      type: "object",
      properties: {
        number: { type: "number" },
        street_name: { type: "string" },
        street_type: { enum: ["Street", "Avenue", "Boulevard"] },
      },
    },
  ],
  [
    "propertyNames",
    {
      type: "object",
      propertyNames: {
        pattern: "^[A-Za-z_][A-Za-z0-9_]*$",
      },
    },
  ],
  [
    "required",
    {
      type: "object",
      properties: {
        id: { type: "number", readOnly: true },
        name: { type: "string" },
        email: { type: "string" },
        address: { type: "string" },
        telephone: { type: "string", deprecated: true },
        pin_code: { type: "string", writeOnly: true },
      },
      required: ["name", "email"],
    },
  ],
  [
    "Unspecified type (object)",
    {
      minProperties: 1,
    },
  ],
  [
    "Unspecified required properties",
    {
      required: ["prop1", "prop2"],
    },
  ],
  [
    "unevaluatedProperties = false",
    {
      unevaluatedProperties: false,
    },
  ],
  [
    "unevaluatedProperties as not a boolean",
    {
      unevaluatedProperties: {
        type: "number",
      },
    },
  ],
];

describe("JSONSchemaViewer - object", () => {
  test.each(testcases)("test %s", (fakeSchema) => {
    // Render the component
    const { asFragment } = render(<JSONSchemaViewer schema={fakeSchema} />);

    // Capture the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
