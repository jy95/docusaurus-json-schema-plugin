"use strict";(self.webpackChunktestsite=self.webpackChunktestsite||[]).push([[5891,7357],{50441:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>m,contentTitle:()=>h,default:()=>w,frontMatter:()=>d,metadata:()=>p,toc:()=>f});var i=s(24246),l=s(11151),n=s(9286),a=s(17357),o=s(47718),r=s.n(o),c=s(74866),u=s(85162);const d={description:"schema conditionally with multiple if-then-else clauses showcase",title:"\ud83d\udd00 If-Then-Else (multiple)"},h="If-Then-Else (multiple)",p={id:"demo-viewer/schema_conditionally/if-then-else_multiple",title:"\ud83d\udd00 If-Then-Else (multiple)",description:"schema conditionally with multiple if-then-else clauses showcase",source:"@site/docs/demo-viewer/schema_conditionally/if-then-else_multiple.mdx",sourceDirName:"demo-viewer/schema_conditionally",slug:"/demo-viewer/schema_conditionally/if-then-else_multiple",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/schema_conditionally/if-then-else_multiple",draft:!1,unlisted:!1,editUrl:"https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/docs/demo-viewer/schema_conditionally/if-then-else_multiple.mdx",tags:[],version:"current",frontMatter:{description:"schema conditionally with multiple if-then-else clauses showcase",title:"\ud83d\udd00 If-Then-Else (multiple)"},sidebar:"tutorialSidebar",previous:{title:"\ud83c\udfac If-Then-Else",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/schema_conditionally/if-then-else"},next:{title:"\ud83e\uddf5 String",permalink:"/docusaurus-json-schema-plugin/docs/category/-string"}},m={},f=[];function y(e){const t={h1:"h1",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"if-then-else-multiple",children:"If-Then-Else (multiple)"}),"\n",(0,i.jsxs)(c.default,{children:[(0,i.jsx)(u.default,{value:"Viewer",label:"Viewer",default:!0,children:(0,i.jsx)(r(),{schema:a})}),(0,i.jsx)(u.default,{value:"JSON Schema",label:"JSON Schema",children:(0,i.jsx)(n.default,{language:"json",children:JSON.stringify(a,null,2)})})]})]})}function w(e={}){const{wrapper:t}={...(0,l.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(y,{...e})}):y(e)}},17357:e=>{e.exports=JSON.parse('{"type":"object","properties":{"street_address":{"type":"string"},"country":{"default":"United States of America","enum":["United States of America","Canada","Netherlands"]}},"allOf":[{"if":{"properties":{"country":{"const":"United States of America"}}},"then":{"properties":{"postal_code":{"pattern":"[0-9]{5}(-[0-9]{4})?"}}}},{"if":{"properties":{"country":{"const":"Canada"}},"required":["country"]},"then":{"properties":{"postal_code":{"pattern":"[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"}}}},{"if":{"properties":{"country":{"const":"Netherlands"}},"required":["country"]},"then":{"properties":{"postal_code":{"pattern":"[0-9]{4} [A-Z]{2}"}}}}]}')}}]);