import React from "react";
import { expect, test, describe } from "@jest/globals";
import { render, act } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
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
  test.each(testcases)("test %s", async (_title, fakeSchema) => {
    let result: RenderResult | null = null;

    // Render the component within act
    await act(async () => {
      result = render(
        <JSONSchemaViewer schema={fakeSchema} viewerOptions={{ showExamples: true }} />
      );
    });

    // Capture the snapshot
    expect(result!.asFragment()).toMatchSnapshot();
  });
});