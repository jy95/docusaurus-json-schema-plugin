import React from "react";
import { expect, test, describe } from "@jest/globals";
import { render } from "@testing-library/react";
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index";

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types";

const testcases: JSONSchema[] = [
  {
    type: "null",
    description: "A simple null example",
  },
  {
    enum: [null, "Some constant here ..."],
  },
];

describe("JSONSchemaViewer - null type", () => {
  test.each(testcases)("test %#", (fakeSchema) => {
    // Render the component
    const { asFragment } = render(<JSONSchemaViewer schema={fakeSchema} />);

    // Capture the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
