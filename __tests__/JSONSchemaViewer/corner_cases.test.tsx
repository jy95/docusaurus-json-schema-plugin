import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render, act } from "@testing-library/react"

import type { RenderResult } from "@testing-library/react"
import type { JSX } from "react"

// Type to prevent creating invalid mocks
import type {
  JSONSchema,
  JSONSchemaNS,
} from "../../src/theme/JSONSchemaViewer/types"

// Components
import { CreateNodes } from "../../src/theme/JSONSchemaViewer/components/index"
import {
  CreateArray,
  CreateObject,
} from "../../src/theme/JSONSchemaViewer/JSONSchemaElements/index"
import { detectedTypes } from "../../src/theme/JSONSchemaViewer/utils/index"

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
]

describe("JSONSchemaViewer - corner cases", () => {
  test.each(testcases)("%s", async (_title, Component, fakeSchema) => {
    // Render the component
    let rendered: RenderResult | null = null

    // Use act to ensure all updates are processed
    await act(async () => {
      rendered = render(<Component schema={fakeSchema} />)
    })

    // Capture the snapshot
    expect(rendered!.asFragment()).toMatchSnapshot()
  })

  test("Correctly infers integer when not explicitly expressed", () => {
    const foundTypes = detectedTypes({
      multipleOf: 1,
    })

    expect(foundTypes).toContain("integer")
  })
})
