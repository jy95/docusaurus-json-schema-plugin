"use strict";(self.webpackChunktestsite=self.webpackChunktestsite||[]).push([[4280,7572],{93610:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>m,contentTitle:()=>d,default:()=>f,frontMatter:()=>r,metadata:()=>h,toc:()=>p});var n=s(24246),i=s(11151),o=s(9286),a=s(97572),c=s(47718),l=s.n(c);const r={description:"schema conditionally with if-then-else showcase",title:"\ud83c\udfac If-Then-Else"},d="If-Then-Else",h={id:"demo-viewer/schema_conditionally/if-then-else",title:"\ud83c\udfac If-Then-Else",description:"schema conditionally with if-then-else showcase",source:"@site/docs/demo-viewer/schema_conditionally/if-then-else.mdx",sourceDirName:"demo-viewer/schema_conditionally",slug:"/demo-viewer/schema_conditionally/if-then-else",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/schema_conditionally/if-then-else",draft:!1,unlisted:!1,editUrl:"https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/docs/demo-viewer/schema_conditionally/if-then-else.mdx",tags:[],version:"current",frontMatter:{description:"schema conditionally with if-then-else showcase",title:"\ud83c\udfac If-Then-Else"},sidebar:"tutorialSidebar",previous:{title:"\ud83c\udfd7\ufe0f dependentSchemas",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/schema_conditionally/dependentSchemas"},next:{title:"\ud83d\udd00 If-Then-Else (multiple)",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/schema_conditionally/if-then-else_multiple"}},m={},p=[];function u(e){const t={h1:"h1",p:"p",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"if-then-else",children:"If-Then-Else"}),"\n",(0,n.jsx)(t.p,{children:"JSON Schema :"}),"\n",(0,n.jsx)(o.default,{language:"json",children:JSON.stringify(a,null,2)}),"\n",(0,n.jsx)(t.p,{children:"Viewer :"}),"\n",(0,n.jsx)(l(),{schema:a})]})}function f(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},97572:e=>{e.exports=JSON.parse('{"type":"object","properties":{"street_address":{"type":"string"},"country":{"default":"United States of America","enum":["United States of America","Canada"]}},"if":{"properties":{"country":{"const":"United States of America"}}},"then":{"properties":{"postal_code":{"pattern":"[0-9]{5}(-[0-9]{4})?"}}},"else":{"properties":{"postal_code":{"pattern":"[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"}}}}')}}]);