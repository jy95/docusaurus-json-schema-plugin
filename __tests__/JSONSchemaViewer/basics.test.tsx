import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render, act } from "@testing-library/react"
import type { RenderResult } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

describe("JSONSchemaViewer - basics tests", () => {
  test("Can render a simple schema", async () => {
    const fakeSchema: JSONSchema = { type: "boolean" }
    let result: RenderResult | null = null

    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    expect(result!.asFragment()).toMatchSnapshot()
  })

  test("Can render Schema title", async () => {
    const fakeSchema2: JSONSchema = {
      type: "boolean",
      title: "My Super Schema",
    }
    let result: RenderResult | null = null

    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema2} />)
    })

    expect(result!.asFragment()).toMatchSnapshot()
  })
})
