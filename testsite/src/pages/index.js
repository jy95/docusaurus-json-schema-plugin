import React from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import useBaseUrl from "@docusaurus/useBaseUrl"
import styles from "./styles.module.css"

const features = [
  {
    title: "JSON Schema Viewer / Editor",
    imageUrl: "img/undraw_code_review.svg",
    description: (
      <>
        Explore your Draft 7 JSON Schema directly from your Docusaurus website. 
      </>
    ),
  },
  {
    title: "Configurable",
    imageUrl: "img/gear-tools.svg",
    description: (
      <>
        <a href="https://docusaurus.io/docs/i18n/introduction">Internationalization</a>, Theme-able (as follow <a href="https://infima.dev/">Infima styling framework</a> that powers the Docusaurus UI), ...
      </>
    ),
  },
  {
    title: "Open source",
    imageUrl: "img/opensource-icon.svg",
    description: (
      <>
        Want to improve this plugin ? We welcome your <a href="https://github.com/jy95/docusaurus-json-schema-viewer-plugin">contributions</a> !
      </>
    ),
  },
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
