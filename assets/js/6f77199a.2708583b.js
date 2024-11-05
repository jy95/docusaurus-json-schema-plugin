"use strict";(self.webpackChunktestsite=self.webpackChunktestsite||[]).push([[9517,9534],{81250:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>m,contentTitle:()=>p,default:()=>w,frontMatter:()=>h,metadata:()=>i,toc:()=>f});const i=JSON.parse('{"id":"demo-viewer/schema_conditionally/if-then-else_multiple","title":"\ud83d\udd00 If-Then-Else (multiple)","description":"schema conditionally with multiple if-then-else clauses showcase","source":"@site/docs/demo-viewer/schema_conditionally/if-then-else_multiple.mdx","sourceDirName":"demo-viewer/schema_conditionally","slug":"/demo-viewer/schema_conditionally/if-then-else_multiple","permalink":"/docusaurus-json-schema-plugin/docs/demo-viewer/schema_conditionally/if-then-else_multiple","draft":false,"unlisted":false,"editUrl":"https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/docs/demo-viewer/schema_conditionally/if-then-else_multiple.mdx","tags":[],"version":"current","frontMatter":{"description":"schema conditionally with multiple if-then-else clauses showcase","title":"\ud83d\udd00 If-Then-Else (multiple)"},"sidebar":"tutorialSidebar","previous":{"title":"\ud83c\udfac If-Then-Else","permalink":"/docusaurus-json-schema-plugin/docs/demo-viewer/schema_conditionally/if-then-else"},"next":{"title":"\ud83e\uddf5 String","permalink":"/docusaurus-json-schema-plugin/docs/category/-string"}}');var l=s(62540),n=s(28453),a=s(21432),r=s(89534),o=s(21344),c=s.n(o),d=s(11470),u=s(19365);const h={description:"schema conditionally with multiple if-then-else clauses showcase",title:"\ud83d\udd00 If-Then-Else (multiple)"},p="If-Then-Else (multiple)",m={},f=[];function y(e){const t={h1:"h1",header:"header",...(0,n.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.header,{children:(0,l.jsx)(t.h1,{id:"if-then-else-multiple",children:"If-Then-Else (multiple)"})}),"\n",(0,l.jsxs)(d.default,{children:[(0,l.jsx)(u.default,{value:"Viewer",label:"Viewer",default:!0,children:(0,l.jsx)(c(),{schema:r})}),(0,l.jsx)(u.default,{value:"JSON Schema",label:"JSON Schema",children:(0,l.jsx)(a.default,{language:"json-schema",children:JSON.stringify(r,null,2)})})]})]})}function w(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(y,{...e})}):y(e)}},89534:e=>{e.exports=JSON.parse('{"type":"object","properties":{"street_address":{"type":"string"},"country":{"default":"United States of America","enum":["United States of America","Canada","Netherlands"]}},"allOf":[{"if":{"properties":{"country":{"const":"United States of America"}}},"then":{"properties":{"postal_code":{"pattern":"[0-9]{5}(-[0-9]{4})?"}}}},{"if":{"properties":{"country":{"const":"Canada"}},"required":["country"]},"then":{"properties":{"postal_code":{"pattern":"[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"}}}},{"if":{"properties":{"country":{"const":"Netherlands"}},"required":["country"]},"then":{"properties":{"postal_code":{"pattern":"[0-9]{4} [A-Z]{2}"}}}}]}')}}]);