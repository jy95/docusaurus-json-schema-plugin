import React from "react";

// For typings autocomplete whatever your IDE
import { expect, test, describe, jest } from "@jest/globals"

import { create, act } from "react-test-renderer"

import JSONSchemaViewer from "../../src/theme/JSONSchemaViewer/index";

// Type to prevent creating invalid mocks
import type { JSONSchema } from "../../src/theme/JSONSchemaViewer/types"

// Type for react-test-renderer
import type { ReactTestRenderer } from "react-test-renderer"

jest.mock('@stoplight/json-ref-resolver', () => {
    const resolve = jest.fn<() => Promise<JSONSchema>>().mockRejectedValue(new Error('Resolver error'));
    return {
      Resolver: jest.fn(() => ({ resolve }))
    };
});

describe("JSONSchemaViewer states", () => {

    test("Can render error when something bad happens", async () => {
        const fakeSchema3 : JSONSchema = { "type": "object" }
    
        // render the component
        let root: ReactTestRenderer | undefined
        await act(async () => {
          root = create(<JSONSchemaViewer schema={fakeSchema3} />)
        })
    
        // make assertions on root
        expect(root?.toJSON()).toMatchSnapshot()
      })
});
