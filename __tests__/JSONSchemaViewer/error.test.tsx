import React from "react"
import { expect, test, describe, jest } from "@jest/globals"
import { render, act } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"

import type { RenderResult } from "@testing-library/react"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

jest.mock("@stoplight/json-ref-resolver", () => {
  const resolve = jest.fn(() => Promise.reject(new Error("Resolver error")))
  return {
    Resolver: jest.fn(() => ({ resolve })),
  }
})

describe("JSONSchemaViewer states", () => {
  test("Can render error when something bad happens", async () => {
    const fakeSchema: JSONSchema = { type: "object" }
    let result: RenderResult | null = null

    // Render the component within act
    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    // Capture the snapshot
    expect(result!.asFragment()).toMatchSnapshot()
  })
})
