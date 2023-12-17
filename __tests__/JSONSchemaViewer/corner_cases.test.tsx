import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

// Type to prevent creating invalid mocks
import type {
  JSONSchema,
  JSONSchemaNS,
} from "../../src/theme/JSONSchemaViewer/types"

// Type for react-test-renderer
import type { ReactTestRenderer } from "react-test-renderer"

// Components
import { CreateNodes } from "../../src/theme/JSONSchemaViewer/components/index"

import {
  CreateArray,
  CreateObject,
} from "../../src/theme/JSONSchemaViewer/JSONSchemaElements/index"

import { UnsolvedRefsQM } from "../../src/theme/JSONSchemaViewer/utils/QualifierMessages/index"

import { detectedTypes } from "../../src/theme/JSONSchemaViewer/utils/index"

// Annoying test cases, just for coverage stories ...
const testcases: [
  string,
  (props: { schema: any; [x: string]: any }) => JSX.Element,
  JSONSchema,
][] = [
  ["CreateNodes - boolean schema (false)", CreateNodes, false],
  ["CreateNodes - boolean schema (true)", CreateNodes, true],
  [
    "CreateArray - sub properties as boolean schema",
    CreateArray,
    {
      items: false,
      contains: false,
      prefixItems: false,
    } as JSONSchemaNS.Array,
  ],
  [
    "CreateObject - sub properties as boolean schema",
    CreateObject,
    {
      additionalProperties: false,
    } as JSONSchemaNS.Object,
  ],
  [
    "CreateObject - missing pattern in propertyNames",
    CreateObject,
    {
      propertyNames: {
        description: "I forgot the pattern key",
      },
    } as JSONSchemaNS.Object,
  ],
  [
    "CreateArray - invalid usage of Additional Items",
    CreateArray,
    {
      items: {
        type: "string",
      },
      additionalItems: {
        type: "boolean",
      },
    } as JSONSchemaNS.Array,
  ],
  [
    "UnsolvedRefsQM - multiple unsolved ref",
    UnsolvedRefsQM,
    {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: "https://example.com/tree",
      $dynamicAnchor: "node",
      type: "object",
      properties: {
        data: true,
        children: {
          type: "array",
          items: { $dynamicRef: "#node", $recursiveRef: "#" },
        },
      },
    },
  ],
]

describe("JSONSchemaViewer - corner cases", () => {
  test.each(testcases)("%s", async (_title, Component, fakeSchema) => {
    // render the component
    let root: ReactTestRenderer | undefined

    await act(async () => {
      root = create(<Component schema={fakeSchema} />)
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })

  test("Correctly infer integer when not explictly expressed", async () => {
    const foundTypes = detectedTypes({
      multipleOf: 1,
    })

    expect(foundTypes).toContain("integer")
  })
})
