import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"
import CodeBlock from "../../__mocks__/@theme-original/CodeBlock"

describe("JSONSchemaViewer - constructor", () => {
  test("Overwrite default qualifierMessagesOrder value", async () => {
    const fakeSchema: JSONSchema = {
      type: "object",
      minProperties: 1,
    }

    const { asFragment } = render(
      <JSONSchemaViewer
        schema={fakeSchema}
        viewerOptions={{ qualifierMessagesOrder: ["objectProperties"] }}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test("Overwrite default DescriptionComponent value", async () => {
    const fakeSchema2: JSONSchema = {
      type: "object",
      description: "# Hello, *world*!",
    }

    const { asFragment } = render(
      <JSONSchemaViewer
        schema={fakeSchema2}
        viewerOptions={{
          DescriptionComponent: () => (
            <h1>
              Hello, <em>world</em>!
            </h1>
          ),
        }}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test("Overwrite default UnresolvedRefsComponent value", async () => {
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

    const { asFragment } = render(
      <JSONSchemaViewer
        schema={fakeSchema}
        viewerOptions={{
          UnresolvedRefsComponent: () => <>#node was not resolved</>,
        }}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test("Overwrite default ValueComponent value", async () => {
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

    const { asFragment } = render(
      <JSONSchemaViewer
        schema={fakeSchema}
        viewerOptions={{
          ValueComponent: ({ value, schema }) => {
            if (!["string", "number", "undefined"].includes(typeof value)) {
              return (
                <CodeBlock language="json">{`${JSON.stringify(
                  value,
                  null,
                  2,
                )}`}</CodeBlock>
              )
            }

            const component = <code>{`${value}`}</code>

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

    expect(asFragment()).toMatchSnapshot()
  })

  test("Overwrite default className value", async () => {
    const fakeSchema: JSONSchema = {
      type: "object",
      minProperties: 1,
    }

    const { asFragment } = render(
      <JSONSchemaViewer schema={fakeSchema} className="jsv-custom" />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
