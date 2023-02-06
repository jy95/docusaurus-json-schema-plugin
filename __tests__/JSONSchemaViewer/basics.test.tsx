import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

describe("JSONSchemaViewer - basics tests", () => {
  test("Can render a simple schema", async () => {
    const fakeSchema: JSONSchema = {
      type: "boolean",
    }

    // render the component
    let root: any
    await act(async () => {
      root = create(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })

  test("Can render Schema title", async () => {
    const fakeSchema2: JSONSchema = {
      type: "boolean",
      title: "My Super Schema",
    }

    // render the component
    let root: any
    await act(async () => {
      root = create(<JSONSchemaViewer schema={fakeSchema2} />)
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
