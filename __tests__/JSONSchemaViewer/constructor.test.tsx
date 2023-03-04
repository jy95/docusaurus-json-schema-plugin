import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

// Type for react-test-renderer
import type { ReactTestRenderer } from "react-test-renderer"

describe("JSONSchemaViewer - constructor", () => {
  test("Overwrite default qualifierMessagesOrder value", async () => {
    const fakeSchema: JSONSchema = {
      type: "object",
      minProperties: 1,
    }

    // render the component
    let root: ReactTestRenderer | undefined
    await act(async () => {
      root = create(
        <JSONSchemaViewer
          schema={fakeSchema}
          viewerOptions={{ qualifierMessagesOrder: ["objectProperties"] }}
        />
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })

  test("Overwrite default DescriptionComponent value", async () => {
    const fakeSchema: JSONSchema = {
      type: "object",
      // Markdown text
      description: "# Hello, *world*!",
    }

    // render the component
    let root: ReactTestRenderer | undefined
    await act(async () => {
      root = create(
        <JSONSchemaViewer
          schema={fakeSchema}
          viewerOptions={{
            // To simulate "react-markdown" like libraries
            // In prod context, it will likely be invoked like this
            // DescriptionComponent: ({description}) => <ReactMarkdown children={description} />
            DescriptionComponent: () => (
              <h1>
                {" "}
                Hello, <em>world</em>!{" "}
              </h1>
            ),
          }}
        />
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
