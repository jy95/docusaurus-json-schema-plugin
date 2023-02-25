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
    "basic",
    {
      type: "string",
    },
  ],
  [
    "format",
    {
      type: "object",
      properties: {
        prop1: {
          type: "string",
          format: "date-time",
          examples: ["2018-11-13T20:20:39+00:00"],
        },
        prop2: {
          type: "string",
          format: "time",
          examples: ["20:20:39+00:00"],
        },
        prop3: {
          type: "string",
          format: "date",
          examples: ["2018-11-13"],
        },
        prop4: {
          type: "string",
          format: "duration",
          examples: ["P3D"],
        },
        prop5: {
          type: "string",
          format: "email",
          examples: ["test@gmail.com"],
        },
        prop6: {
          type: "string",
          format: "idn-email",
          examples: ["test@gmail.com"],
        },
        prop7: {
          type: "string",
          format: "hostname",
          examples: ["example"],
        },
        prop8: {
          type: "string",
          format: "idn-hostname",
          examples: ["example"],
        },
        prop9: {
          type: "string",
          format: "ipv4",
          examples: ["192.168.1.1"],
        },
        prop10: {
          type: "string",
          format: "ipv6",
          examples: ["2001:db8:3333:4444:5555:6666:7777:8888"],
        },
        prop11: {
          type: "string",
          format: "uuid",
          examples: ["3e4666bf-d5e5-4aa7-b8ce-cefe41c7568a"],
        },
        prop12: {
          type: "string",
          format: "uri",
          examples: ["https://www.perdu.com/"],
        },
        prop12B: {
          type: "string",
          format: "uri-reference",
        },
        prop13: {
          type: "string",
          format: "iri",
          examples: ["https://www.perdu.com/"],
        },
        prop13B: {
          type: "string",
          format: "iri-reference",
        },
        prop14: {
          type: "string",
          format: "uri-template",
        },
        prop15: {
          type: "string",
          format: "json-pointer",
        },
        prop16: {
          type: "string",
          format: "relative-json-pointer",
        },
        prop17: {
          type: "string",
          format: "regex",
          examples: ["^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"],
        },
      },
    },
  ],
  [
    "minLength",
    {
      type: "string",
      minLength: 2,
    },
  ],
  [
    "maxLength",
    {
      type: "string",
      maxLength: 3,
    },
  ],
  [
    "minLength & maxLength",
    {
      type: "string",
      minLength: 2,
      maxLength: 3,
    },
  ],
  [
    "pattern",
    {
      type: "string",
      pattern: "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
    },
  ],
  [
    "contentEncoding",
    {
      type: "string",
      contentEncoding: "base64",
    },
  ],
  [
    "contentMediaType",
    {
      type: "string",
      contentMediaType: "application/json",
    },
  ],
  [
    "contentEncoding with contentMediaType",
    {
      type: "string",
      contentEncoding: "base64",
      contentMediaType: "application/json",
    },
  ],
  [
    "contentSchema",
    {
      type: "string",
      contentSchema: {
        type: "object",
        required: ["name", "age"],
      },
    },
  ],
]

describe("JSONSchemaViewer - string", () => {
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
