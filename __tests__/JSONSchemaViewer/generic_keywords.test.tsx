import React from "react";
import { expect, test, describe } from "@jest/globals";
import { render } from "@testing-library/react";
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index";

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types";

const testcases: [string, JSONSchema][] = [
  [
    "annotations",
    {
      title: "Match anything",
      description: "This is a schema that matches anything.",
      default: "Default value",
      examples: ["Anything", 4035],
      deprecated: true,
      readOnly: true,
      writeOnly: false,
    },
  ],
  [
    "const",
    {
      properties: {
        country: {
          const: "United States of America",
        },
      },
    },
  ],
  [
    "enum",
    {
      enum: ["red", "amber", "green"],
      examples: ["red"],
    },
  ],
  [
    "const (as single enum value)",
    {
      properties: {
        country: {
          enum: ["US"],
          description: "const (as single enum value)",
        },
      },
    },
  ],
];

describe("JSONSchemaViewer - Generic keywords", () => {
  test.each(testcases)("test %s", (_title, fakeSchema) => {
    // Render the component
    const { asFragment } = render(
      <JSONSchemaViewer schema={fakeSchema} viewerOptions={{ showExamples: true }} />
    );

    // Capture the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
