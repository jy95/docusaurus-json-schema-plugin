import React from "react";
import { expect, test, describe, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index";
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types";

jest.mock("@stoplight/json-ref-resolver", () => {
  const resolve = jest.fn(() => Promise.reject(new Error("Resolver error")));
  return {
    Resolver: jest.fn(() => ({ resolve })),
  };
});

describe("JSONSchemaViewer states", () => {
  test("Can render error when something bad happens", async () => {
    const fakeSchema3: JSONSchema = { type: "object" };

    render(<JSONSchemaViewer schema={fakeSchema3} />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
