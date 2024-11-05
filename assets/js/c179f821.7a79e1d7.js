"use strict";(self.webpackChunktestsite=self.webpackChunktestsite||[]).push([[1110],{86387:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>t,toc:()=>u});const t=JSON.parse('{"id":"quick-start","title":"\u26a1 Quick Start","description":"Getting started with docusaurus-json-schema-plugin","source":"@site/docs/quick-start.mdx","sourceDirName":".","slug":"/quick-start","permalink":"/docusaurus-json-schema-plugin/docs/quick-start","draft":false,"unlisted":false,"editUrl":"https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/docs/quick-start.mdx","tags":[],"version":"current","frontMatter":{"title":"\u26a1 Quick Start","description":"Getting started with docusaurus-json-schema-plugin"},"sidebar":"tutorialSidebar","next":{"title":"\ud83d\udca1 Demos","permalink":"/docusaurus-json-schema-plugin/docs/demo"}}');var i=s(62540),a=s(28453),c=s(11470),r=s(19365);const o={title:"\u26a1 Quick Start",description:"Getting started with docusaurus-json-schema-plugin"},l=void 0,d={},u=[{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Configuring <code>docusaurus.config.js</code>",id:"configuring-docusaurusconfigjs",level:3},{value:"Configuring website <code>tsconfig.json</code>",id:"configuring-website-tsconfigjson",level:3},{value:"Usage",id:"usage",level:2},{value:"Output examples",id:"output-examples",level:2}];function h(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Getting started with ",(0,i.jsx)(n.code,{children:"docusaurus-json-schema-plugin"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsxs)(n.p,{children:["Install ",(0,i.jsx)(n.code,{children:"docusaurus-json-schema-plugin"})," using your desired package manager :"]}),"\n",(0,i.jsxs)(c.default,{groupId:"npm2yarn",children:[(0,i.jsx)(r.default,{value:"npm",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm install docusaurus-json-schema-plugin\n"})})}),(0,i.jsx)(r.default,{value:"yarn",label:"Yarn",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn add docusaurus-json-schema-plugin\n"})})}),(0,i.jsx)(r.default,{value:"pnpm",label:"pnpm",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"pnpm add docusaurus-json-schema-plugin\n"})})})]}),"\n",(0,i.jsxs)(n.admonition,{title:"NPM only",type:"tip",children:[(0,i.jsxs)(n.p,{children:["When installing with npm, add this to the previous command : ",(0,i.jsx)(n.code,{children:"--prefer-dedupe"})]}),(0,i.jsxs)(n.p,{children:["Why ",(0,i.jsx)(n.code,{children:"--prefer-dedupe"})," ? Because of ",(0,i.jsx)(n.a,{href:"https://reactjs.org/warnings/invalid-hook-call-warning.html",children:"Invalid Hook Call Warning"})," common issue in projets"]})]}),"\n",(0,i.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsxs)(n.h3,{id:"configuring-docusaurusconfigjs",children:["Configuring ",(0,i.jsx)(n.code,{children:"docusaurus.config.js"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="docusaurus.config.js"',children:'{\n   // Allows use of @theme/JSONSchemaEditor or @theme/JSONSchemaViewer\n   themes: ["docusaurus-json-schema-plugin"],\n}\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"configuring-website-tsconfigjson",children:["Configuring website ",(0,i.jsx)(n.code,{children:"tsconfig.json"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title="tsconfig.json"',children:'{\n  "extends": "@tsconfig/docusaurus/tsconfig.json",\n  "compilerOptions": {\n    "baseUrl": ".",\n    "resolveJsonModule": true,\n    // Extending "@tsconfig/docusaurus/tsconfig.json".types with "docusaurus-json-schema-plugin"\n    "types": ["node", "@docusaurus/module-type-aliases", "@docusaurus/theme-classic", "docusaurus-json-schema-plugin"]\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.p,{children:["You are free to fetch your JSON Schema ",(0,i.jsx)(n.strong,{children:"the way you want"})]}),"\n",(0,i.jsxs)(c.default,{children:[(0,i.jsxs)(r.default,{value:"staticAsset",label:"From a static asset",default:!0,children:[(0,i.jsx)(n.p,{children:"Suppose you have the following asset defined :"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title="/static/schemas/mySuperSchema.json"',children:'{\n   "type":"array",\n   "description":"Represent a street address such as [\'1600\',\'Pennsylvania\',\'Avenue\',\'NW\']",\n   "items":false,\n   "prefixItems":[\n      {\n         "type":"number",\n         "description":"The address number"\n      },\n      {\n         "type":"string",\n         "description":"The name of the street"\n      },\n      {\n         "enum":[\n            "Street",\n            "Avenue",\n            "Boulevard"\n         ],\n         "description":"The type of street"\n      },\n      {\n         "enum":[\n            "NW",\n            "NE",\n            "SW",\n            "SE"\n         ],\n         "description":"The city quadrant of the address"\n      }\n   ]\n}\n'})}),(0,i.jsx)(n.p,{children:"Which you can use in your MDX pages as :"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="/docs/example.mdx"',children:'import CodeBlock from \'@theme/CodeBlock\';\nimport Schema from "@site/static/schemas/mySuperSchema.json";\nimport JSONSchemaViewer from "@theme/JSONSchemaViewer";\n\n# My super Schema \n\n<JSONSchemaViewer schema={ Schema } />\n\n# Source :\n\n<CodeBlock language="json-schema">{JSON.stringify(Schema, null, 2)}</CodeBlock>\n'})})]}),(0,i.jsxs)(r.default,{value:"fetch",label:"From the web",children:[(0,i.jsxs)(n.p,{children:["Suppose your specifications are available somewhere ( ",(0,i.jsx)(n.a,{href:"https://gist.github.com/",children:"Github Gists"})," / ",(0,i.jsx)(n.a,{href:"https://bitbucket.org/snippets/new",children:"Bitbucket Snippets"})," / ... )"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="/src/pages/API.tsx"',children:'import React from "react"\nimport Layout from "@theme/Layout"\nimport JSONSchemaViewer from "@theme/JSONSchemaViewer"\n\nexport default function ExamplePage(): JSX.Element {\n    const [schema, setSchema] = React.useState(undefined as undefined | Error | unknown);\n\n    React.useEffect( () => {\n        fetch(\n            // TODO Your link here\n            "https://gist.githubusercontent.com/jy95/...",\n            {\n                headers: {\n                    \'Accept\': \'application/json\',\n                }\n            }\n        )\n            .then((response) => response.json())\n            .then((data) => setSchema(data))\n            .catch( (err) => setSchema(err) )\n    }, [schema])\n\n    return (\n        <Layout\n            title={`My super JSON Schema`}\n            description="Description will go into a meta tag in <head />"\n        >\n            {schema === undefined && <div>Loading ...</div>}\n            {schema !== undefined && schema instanceof Error && <div>Houston we have a problem : {schema.message}</div>}\n            {schema !== undefined && !(schema instanceof Error) && <JSONSchemaViewer schema={schema} />}\n        </Layout>\n    )\n}\n'})}),(0,i.jsxs)(n.p,{children:["Which you can see by access related page (e.g. ",(0,i.jsx)(n.code,{children:"/API"})," in that case )"]})]}),(0,i.jsxs)(r.default,{value:"other",label:"From ...",children:[(0,i.jsxs)(n.p,{children:["With the two previous ",(0,i.jsx)(n.code,{children:"From"})," sections, you get the point that there are unlimited possibilities :"]}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"JSON Schema directly defined in the code"}),"\n",(0,i.jsxs)(n.li,{children:["NPM packages that exports ",(0,i.jsx)(n.a,{href:"https://www.schemastore.org/json/",children:"JSON Schema"})," directly"]}),"\n",(0,i.jsx)(n.li,{children:"..."}),"\n"]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"output-examples",children:"Output examples"}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["We have many examples available on ",(0,i.jsx)(n.a,{href:"demo/viewer",children:"documentation"})," . Check them to see lib in action \ud83d\ude09"]})})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}}}]);