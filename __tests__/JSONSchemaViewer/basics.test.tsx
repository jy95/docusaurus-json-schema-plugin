import React from "react"

// For typings autocomplete whatever your IDE
import {
  expect,
  test,
  describe,
  beforeEach,
  afterEach /*, jest*/,
} from "@jest/globals"

import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

let container: HTMLDivElement | null = null

describe("JSONSchemaViewer - basics tests", () => {
  // Set up
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    if (container !== null) {
      unmountComponentAtNode(container)
      container.remove()
    }
    container = null
  })

  // Finally test
  test("Can render a simple schema", async () => {
    const fakeSchema: JSONSchema = {
      type: "boolean",
    }

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<JSONSchemaViewer schema={fakeSchema} />, container)
    })

    // Checks
    expect(container?.querySelector("summary")?.textContent).toBe("Schema")

    expect(container?.querySelector("details > strong")?.textContent).toBe(
      "type"
    )

    expect(container?.textContent).toContain("boolean")
  })
})
