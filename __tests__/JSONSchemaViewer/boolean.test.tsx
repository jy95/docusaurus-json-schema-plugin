import React from "react"
import { expect, test, describe } from "@jest/globals"
import { render } from "@testing-library/react"
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index"
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

const testcases: JSONSchema[] = [
  {
    type: "boolean",
  },
  {
    enum: [true, false],
    default: false,
    description: "Boolean without the explict type",
  },
]

describe("JSONSchemaViewer - Boolean type", () => {
  test.each(testcases)("test %#", async (fakeSchema) => {
    const { asFragment } = render(<JSONSchemaViewer schema={fakeSchema} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
