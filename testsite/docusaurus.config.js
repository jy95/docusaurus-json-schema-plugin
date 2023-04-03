const path = require("path")

const isDeployPreview = !!process.env.NETLIFY
const baseUrl = isDeployPreview ? "/" : "/docusaurus-json-schema-plugin/"

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Docusaurus JSON Schema Plugin",
  tagline: "JSON Schema plugin viewer / editor in Docusaurus",
  url: "https://jy95.github.io",
  baseUrl: baseUrl,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  trailingSlash: false, // Needed for Gh pages - https://github.com/facebook/docusaurus/issues/5026
  organizationName: "jy95", // Usually your GitHub org/user name.
  projectName: "docusaurus-json-schema-plugin", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "JSON Schema viewer / editor",
      logo: {
        alt: "My Site Logo",
        src: "img/project_icon.svg",
      },
      items: [
        {
          to: "docs/demo/",
          activeBasePath: "docs",
          label: "Demos",
          position: "left",
        },
        {
          to: "playground",
          label: "Playground",
          position: "left",
        },
        {
          label: "Github",
          position: "right",
          to: "https://github.com/jy95/docusaurus-json-schema-plugin",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // https://docusaurus.io/docs/markdown-features/code-blocks#npm2yarn-remark-plugin
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/",
        },
        // Optional: disable the blog plugin
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  themes: [["docusaurus-json-schema-plugin", {}]],
  // Ugly trick to deal with "Invalid hook"
  plugins: [
    () => ({
      name: "resolve-react",
      configureWebpack() {
        return {
          resolve: {
            alias: {
              // assuming root node_modules is up
              react: path.resolve("../node_modules/react"),
            },
          },
        }
      },
    }),
  ],
}
