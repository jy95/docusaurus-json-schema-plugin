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

// Annoying test cases, just for coverage stories ...
const testcases: [
  string,
  (props: { schema: any; [x: string]: any }) => JSX.Element,
  JSONSchema
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
})
