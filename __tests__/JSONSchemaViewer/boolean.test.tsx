import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render, act } from "@testing-library/react"
import type { RenderResult } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: JSONSchema[] = [
  { type: "boolean" },
  { enum: [true, false], default: false, description: "Boolean without the explicit type" },
]

describe("JSONSchemaViewer - Boolean type", () => {
  test.each(testcases)("test %#", async (fakeSchema) => {
    let result: RenderResult | null = null

    await act(async () => {
      result = render(<JSONSchemaViewer schema={fakeSchema} />)
    })

    expect(result!.asFragment()).toMatchSnapshot()
  })
})
