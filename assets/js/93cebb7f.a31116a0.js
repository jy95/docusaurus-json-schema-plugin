"use strict";(self.webpackChunktestsite=self.webpackChunktestsite||[]).push([[2364,4596],{28364:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>u,contentTitle:()=>c,default:()=>$,frontMatter:()=>l,metadata:()=>d,resolverOptions:()=>m,toc:()=>p});var n=r(24246),i=r(11151),t=r(9286),o=r(34596),a=r(47718),f=r.n(a);const l={description:"References inline $ref showcase",title:"\ud83d\udca1 $ref (inline)"},c="$ref",d={id:"demo-viewer/refs/ref",title:"\ud83d\udca1 $ref (inline)",description:"References inline $ref showcase",source:"@site/docs/demo-viewer/refs/ref.mdx",sourceDirName:"demo-viewer/refs",slug:"/demo-viewer/refs/ref",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/refs/ref",draft:!1,unlisted:!1,editUrl:"https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/docs/demo-viewer/refs/ref.mdx",tags:[],version:"current",frontMatter:{description:"References inline $ref showcase",title:"\ud83d\udca1 $ref (inline)"},sidebar:"tutorialSidebar",previous:{title:"\ud83d\udcc1$ref (as local file)",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/refs/localFile"},next:{title:"\ud83c\udf10 $ref (as remote file)",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/refs/remoteFile"}},u={},m={jsonPointer:"#/definitions/user"},p=[];function h(e){const s=Object.assign({h1:"h1",p:"p"},(0,i.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"ref",children:"$ref"}),"\n",(0,n.jsx)(s.p,{children:"JSON Schema :"}),"\n",(0,n.jsx)(t.default,{language:"json",children:JSON.stringify(o,null,2)}),"\n",(0,n.jsx)(s.p,{children:"resolverOptions :"}),"\n",(0,n.jsx)(t.default,{language:"json",children:JSON.stringify(m,null,2)}),"\n",(0,n.jsx)(s.p,{children:"Viewer :"}),"\n",(0,n.jsx)(f(),{schema:o,resolverOptions:m})]})}const $=function(e={}){const{wrapper:s}=Object.assign({},(0,i.ah)(),e.components);return s?(0,n.jsx)(s,Object.assign({},e,{children:(0,n.jsx)(h,e)})):h(e)}},34596:e=>{e.exports=JSON.parse('{"$ref":"#/definitions/user","definitions":{"user":{"properties":{"first_name":{"$ref":"#/$defs/name"},"last_name":{"$ref":"#/$defs/name"},"addresses":{"type":"array","items":false,"prefixItems":[{"$ref":"#/$defs/street_name"},{"$ref":"#/$defs/street_type"},{"$ref":"#/$defs/direction"}]}},"required":["first_name","last_name"]}},"$defs":{"name":{"type":"string"},"postal_code":{"type":"number","minimum":1000,"exclusiveMaximum":10000},"street_name":{"type":"string","minLength":3},"direction":{"enum":["NW","NE","SW","SE"]},"street_type":{"enum":["Street","Avenue","Boulevard"]}}}')}}]);