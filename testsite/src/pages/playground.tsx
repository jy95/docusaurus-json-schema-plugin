import React from "react"
import Layout from "@theme/Layout"
import BrowserOnly from "@docusaurus/BrowserOnly"
import ErrorBoundary from "@docusaurus/ErrorBoundary"
import PlaygroundInner from "@site/src/pages/components/PlaygroundInner"

function PlaygroundComponent(): JSX.Element {
  // No SSR for the live preview
  // See https://github.com/facebook/docusaurus/issues/5747
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <>
          <ErrorBoundary
            fallback={({ error, tryAgain }) => (
              <div>
                <p>
                  Playground component crashed because of error: {error.message}
                  .
                </p>
                <button onClick={tryAgain}>Try Again!</button>
              </div>
            )}
          >
            <PlaygroundInner />
          </ErrorBoundary>
        </>
      )}
    </BrowserOnly>
  )
}

export default function Playground(): JSX.Element {
  return (
    <Layout
      title={`Playground`}
      description="Playground of docusaurus-json-schema-plugin"
    >
      <PlaygroundComponent />
    </Layout>
  )
}
