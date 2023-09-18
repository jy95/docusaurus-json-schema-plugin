import React from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"
import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';

import JSONSchemaViewer from "@theme/JSONSchemaViewer"
import JSONSchemaCreator from "@site/src/components/JSONSchemaCreator"
import JSONSchemaData from "@site/src/components/JSONSchemaData"

import {useLocation} from '@docusaurus/router';
import { Base64 } from 'js-base64';

import {
  PlaygroundContextProvider,
  usePlaygroundContext,
} from "@site/src/contexts/PlaygroundContext"

// Default example to illustrate stuff (it is Draft-07 for info)
import DefaultSchema from "@site/static/schemas/examples/object/additionalProperties.json"

// Type I need for useRef
import type { State as PlaygroundState } from "@site/src/contexts/PlaygroundContext"

// Common stringify of the JSON
const STRINGIFY_JSON = (json: unknown) => JSON.stringify(json, null, "\t")

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function PlaygroundInner(): JSX.Element {
  const {
    state: { userSchema },
  } = usePlaygroundContext()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <JSONSchemaCreator />
        <JSONSchemaData key={STRINGIFY_JSON(userSchema)} />
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          JSON Schema Viewer
        </h1>
        <JSONSchemaViewer
          schema={userSchema}
          key={STRINGIFY_JSON(userSchema)}
        />
      </div>
      <Admonition type="tip">
        <p>
          You can use &nbsp;
          <Link to={`/playground?b64Schema=${
            Base64.encode(STRINGIFY_JSON(userSchema)).replace('+', '-').replace('/', '_').replace('=', '')}`
          }>b64Schema query parameter</Link> 
          &nbsp;with a JSON Schema in Base64URL format so that you can bookmark this page with wanted schema
        </p>
      </Admonition>
    </div>
  )
}

function StateProvider(): JSX.Element {
  const defaultSchema = {
    // To help monaco editor for JSON Schema definition
    $schema: "http://json-schema.org/draft-07/schema",
    // The demo schema
    ...DefaultSchema,
  }
  const [state, setState] = React.useState({
    jsonPointer: "",
    userSchema: defaultSchema,
    fullSchema: defaultSchema,
  } as PlaygroundState)

  // define a function to update the state
  function updateState(newState: Partial<PlaygroundState>) {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  // Query parameter
  const query = useQuery();

  // Base64 schema, in case that some people would like to use the viewer that way
  React.useEffect(() => {
    if (query.has("b64Schema")) {
      let b64Schema = query.get("b64Schema");
      try {
        let newSchemaString = Base64.decode(b64Schema);
        let newSchema = JSON.parse(newSchemaString);
        updateState({
          fullSchema: newSchema,
          userSchema: newSchema,
          jsonPointer: ""
        })
      } catch (error) {
        console.error("Invalid JSON in b64Schema parameter");
        console.error(b64Schema);
      }
    }
  }, [query]);


  return (
    <PlaygroundContextProvider value={{ state, updateState }}>
      <PlaygroundInner />
    </PlaygroundContextProvider>
  )
}

export default function PlaygroundComponent(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return <StateProvider />
      }}
    </BrowserOnly>
  )
}
