"use strict";(self.webpackChunktestsite=self.webpackChunktestsite||[]).push([[5271],{58847:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>h,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>d,toc:()=>l});var r=o(62540),n=o(28453),i=o(11470),s=o(19365);const a={title:"\u270f\ufe0f @theme/JSONSchemaEditor",description:"@theme/JSONSchemaEditor API"},c=void 0,d={id:"api/JSONSchemaEditor",title:"\u270f\ufe0f @theme/JSONSchemaEditor",description:"@theme/JSONSchemaEditor API",source:"@site/docs/api/JSONSchemaEditor.mdx",sourceDirName:"api",slug:"/api/JSONSchemaEditor",permalink:"/docusaurus-json-schema-plugin/docs/api/JSONSchemaEditor",draft:!1,unlisted:!1,editUrl:"https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/docs/api/JSONSchemaEditor.mdx",tags:[],version:"current",frontMatter:{title:"\u270f\ufe0f @theme/JSONSchemaEditor",description:"@theme/JSONSchemaEditor API"},sidebar:"tutorialSidebar",previous:{title:"\u2699\ufe0f Theme Configuration",permalink:"/docusaurus-json-schema-plugin/docs/api/config"},next:{title:"\ud83d\udd0e @theme/JSONSchemaViewer",permalink:"/docusaurus-json-schema-plugin/docs/api/JSONSchemaViewer"}},h={},l=[{value:"Configuration",id:"configuration",level:2},{value:"Examples",id:"examples",level:2}];function m(e){const t={a:"a",code:"code",h2:"h2",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{id:"configuration",children:"Configuration"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Property"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Required ?"}),(0,r.jsx)(t.th,{children:"Note"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"schema"}),(0,r.jsx)(t.td,{children:"JSONSchema |   JSONSchema[]"}),(0,r.jsx)(t.td,{children:"Mandatory"}),(0,r.jsxs)(t.td,{children:["JSON Schema(s) supported by ",(0,r.jsx)(t.a,{href:"https://github.com/microsoft/monaco-editor",children:"monaco-editor"}),", which powers ",(0,r.jsx)(t.a,{href:"https://code.visualstudio.com/Docs/languages/json#_json-schemas-and-settings",children:"VS Code"})," - Currently, it supports all draft versions from Draft 4 to JSON Schema Draft 2020-12"]})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"diagnosticsOptions"}),(0,r.jsx)(t.td,{children:"MonacoEditorProps"}),(0,r.jsx)(t.td,{children:"Optional"}),(0,r.jsx)(t.td,{children:"Options for Monaco Editor diagnostic (useful for instance to enable enableSchemaRequest)"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"...."}),(0,r.jsx)(t.td,{children:"MonacoEditorProps"}),(0,r.jsx)(t.td,{children:"Optional"}),(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.a,{href:"https://github.com/react-monaco-editor/react-monaco-editor#properties",children:"Properties"})," of ",(0,r.jsx)(t.a,{href:"https://github.com/react-monaco-editor/react-monaco-editor",children:"react-monaco-editor"})]})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsx)(i.default,{children:(0,r.jsx)(s.default,{value:"JSX",label:"JSX",default:!0,children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:'import React from "react"\nimport Layout from "@theme/Layout"\nimport JSONSchemaEditor from "@theme/JSONSchemaEditor"\n// import { useColorMode } from "@docusaurus/theme-common"\n\nexport default function ExamplePage(): JSX.Element {\n\n  // You are free to fetch your schema in your own way (load local file, fetch, ...) :)\n  const mySchema = {\n    "type": "object",\n    "properties": {\n      "builtin": {\n        "type": "number"\n      }\n    },\n    "patternProperties": {\n      "^S_": {\n        "type": "string"\n      },\n      "^I_": {\n        "type": "integer"\n      }\n    },\n    "additionalProperties": {\n      "type": "string"\n    }\n  }\n\n  // https://docusaurus.io/docs/api/themes/configuration#use-color-mode\n  return (\n    <Layout\n      title={`My super JSON Schema`}\n      description="Description will go into a meta tag in <head />"\n    >\n      {/* You can "useColorMode" if you want to take into account current Docusaurus color */}\n      <JSONSchemaEditor schema={mySchema} theme={"vs-dark"} />\n    </Layout>\n  )\n}\n'})})})})]})}function u(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}}}]);