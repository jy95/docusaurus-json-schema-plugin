import React from "react"

// For typings autocomplete whatever your IDE
import { expect, test, describe } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

// Type for react-test-renderer
import type { ReactTestRenderer } from "react-test-renderer"
import CodeBlock from "../../__mocks__/@theme-original/CodeBlock"

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
        />,
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
        />,
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })

  test("Overwrite default UnresolvedRefsComponent value", async () => {
    // tree schema, extensible
    // https://json-schema.org/draft/2020-12/release-notes#dynamicref-and-dynamicanchor
    const fakeSchema: JSONSchema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: "https://example.com/tree",
      $dynamicAnchor: "node",
      type: "object",
      properties: {
        data: true,
        children: {
          type: "array",
          items: { $dynamicRef: "#node" },
        },
      },
    }

    // render the component
    let root: ReactTestRenderer | undefined
    await act(async () => {
      root = create(
        <JSONSchemaViewer
          schema={fakeSchema}
          viewerOptions={{
            // To simulate custom handling of unsolved $ref
            UnresolvedRefsComponent: () => <>#node was not resolved</>,
          }}
        />,
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })

  test("Overwrite default ValueComponent value", async () => {
    // tree schema, extensible
    // https://json-schema.org/draft/2020-12/release-notes#dynamicref-and-dynamicanchor
    const fakeSchema: JSONSchema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "CustomizationOptions",
      description: "JSON schema for customized options",
      type: "object",
      properties: {
        customField: {
          type: "string",
          description: "A customized or personalized field",
          enum: [
            "palette",
            "teddyBear",
            "tools",
            "laptop",
            "thread",
            "phone",
            "puzzle",
            "scissors",
            "hammer",
            "note",
          ],
          default: "palette",
          examples: ["tools", "note"],
        },
        customConstObject: {
          type: "object",
          const: {
            version: 5,
          },
        },
      },
      required: ["customField"],
      additionalProperties: false,
    }

    // render the component
    let root: ReactTestRenderer | undefined
    await act(async () => {
      root = create(
        <JSONSchemaViewer
          schema={fakeSchema}
          viewerOptions={{
            ValueComponent: ({ value, schema }) => {
              // render complex values as multiline JSON with 2 space indentation
              if (!["string", "number", "undefined"].includes(typeof value)) {
                return (
                  <CodeBlock language="json">{`${JSON.stringify(
                    value,
                    null,
                    2,
                  )}`}</CodeBlock>
                )
              }

              // display elementary values inline.
              const component = <code>{`${value}`}</code>

              // if schema defines a default value, ensure it is bold wherever it
              // appears (e.g. in an enum)
              if (
                typeof schema !== "boolean" &&
                schema.default &&
                value === schema.default
              ) {
                return <strong>{component}</strong>
              }

              return component
            },
          }}
        />,
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })

  test("Overwrite default className value", async () => {
    const fakeSchema: JSONSchema = {
      type: "object",
      minProperties: 1,
    }

    // render the component
    let root: ReactTestRenderer | undefined
    await act(async () => {
      root = create(
        <JSONSchemaViewer schema={fakeSchema} className="jsv-custom" />,
      )
    })

    // make assertions on root
    expect(root?.toJSON()).toMatchSnapshot()
  })
})
