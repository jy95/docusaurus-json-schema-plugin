import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

describe("JSONSchemaViewer - basics tests", () => {
  test("Can render a simple schema", async () => {
    const fakeSchema: JSONSchema = {
      type: "boolean",
    }

    const { asFragment } = render(<JSONSchemaViewer schema={fakeSchema} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test("Can render Schema title", async () => {
    const fakeSchema2: JSONSchema = {
      type: "boolean",
      title: "My Super Schema",
    }

    const { asFragment } = render(<JSONSchemaViewer schema={fakeSchema2} />)
    expect(asFragment()).toMatchSnapshot()
  })
})