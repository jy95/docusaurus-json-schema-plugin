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
]

describe("JSONSchemaViewer - object", () => {
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
