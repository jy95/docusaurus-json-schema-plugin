(self.webpackChunktestsite=self.webpackChunktestsite||[]).push([[842,3909],{15736:(e,s,a)=>{"use strict";a.r(s),a.d(s,{assets:()=>j,contentTitle:()=>u,default:()=>g,frontMatter:()=>d,metadata:()=>x,toc:()=>f});var n=a(24246),t=a(11151),m=a(9286),o=a(23909),r=a(47718),c=a.n(r),i=a(97099),l=a(60673),p=a(74866),h=a(85162);const d={description:"References remote file $ref showcase",title:"\ud83c\udf10 $ref (as remote file)"},u="$ref (as local file)",x={id:"demo-viewer/refs/remoteFile",title:"\ud83c\udf10 $ref (as remote file)",description:"References remote file $ref showcase",source:"@site/docs/demo-viewer/refs/remoteFile.mdx",sourceDirName:"demo-viewer/refs",slug:"/demo-viewer/refs/remoteFile",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/refs/remoteFile",draft:!1,unlisted:!1,editUrl:"https://github.com/jy95/docusaurus-json-schema-plugin/tree/main/testsite/docs/demo-viewer/refs/remoteFile.mdx",tags:[],version:"current",frontMatter:{description:"References remote file $ref showcase",title:"\ud83c\udf10 $ref (as remote file)"},sidebar:"tutorialSidebar",previous:{title:"\ud83d\udca1 $ref (inline)",permalink:"/docusaurus-json-schema-plugin/docs/demo-viewer/refs/ref"},next:{title:"\ud83e\uddf1 Schema Composition",permalink:"/docusaurus-json-schema-plugin/docs/category/-schema-composition"}},j={},f=[];function y(e){const s={h1:"h1",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"ref-as-local-file",children:"$ref (as local file)"}),"\n",(0,n.jsxs)(p.default,{children:[(0,n.jsx)(h.default,{value:"Viewer",label:"Viewer",default:!0,children:(0,n.jsx)(c(),{schema:o,resolverOptions:(0,i.Z)({remote:!0})})}),(0,n.jsx)(h.default,{value:"resolverOptions",label:"resolverOptions",children:(0,n.jsx)(m.default,{language:"js",children:`${(0,l.Z)((0,i.Z)({remote:!0}))}`})}),(0,n.jsx)(h.default,{value:"JSON Schema",label:"JSON Schema",children:(0,n.jsx)(m.default,{language:"json",children:JSON.stringify(o,null,2)})})]})]})}function g(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(y,{...e})}):y(e)}},97099:(e,s,a)=>{"use strict";function n(e){return void 0===e&&(e=""),{resolve:s=>new Promise(((n,t)=>{const m=function(e,s){void 0===s&&(s="");const a=e.toString().split("/");let n=s;for(let t=0;t<a.length;t++)if(".."===a[t])n=n.split("/").slice(0,-1).join("/");else{if("."===a[t])continue;n=`${n}/${a[t]}`}return n}(s,e);a(2349)(`./${m.substring(1)}`).then((e=>n(e.default))).catch((e=>t(e)))}))}}function t(e){return void 0===e&&(e="http"),{resolve:e=>new Promise(((s,a)=>{fetch(e.toString(),{headers:{Accept:"application/json"}}).then((e=>e.json())).then((e=>s(e))).catch((e=>a(e)))}))}}function m(e){const{basePath:s,jsonPointer:a,remote:m}=e;let o={};return s&&(o.resolvers={file:n(s)}),m&&(void 0===o.resolvers&&(o.resolvers={}),o.resolvers.http=t("http"),o.resolvers.https=t("https")),a&&(o.jsonPointer=a),o}a.d(s,{Z:()=>m})},60673:(e,s,a)=>{"use strict";function n(e,s){void 0===s&&(s=2);return`{\n${Object.keys(e).map((a=>{const t=e[a];if("function"==typeof t){const e=t.toString().match(/function\s+([\w$]+)\s*\(([^)]*)\)/),n=e?e[1]:"anonymous",m=e?e[2].split(",").map((e=>e.trim())).join(", "):"";return`${" ".repeat(s)}${a}: function ${n}(${m}) { /* function body */ },`}return"object"!=typeof t||Array.isArray(t)||null===t?`${" ".repeat(s)}${a}: ${JSON.stringify(t)},`:`${" ".repeat(s)}${a}: ${n(t,s+2)},`})).join("\n")}\n${" ".repeat(s-2)}}`}a.d(s,{Z:()=>n})},2349:(e,s,a)=>{var n={"./img/favicon.ico":[68750,9,8750],"./img/gear-tools.svg":[58595,9,8595],"./img/logo.svg":[11735,9,1735],"./img/opensource-icon.svg":[25770,9,5770],"./img/project_icon.svg":[82835,9,2835],"./img/undraw_code_review.svg":[20619,9,619],"./schemas/examples/array/additionalItems1":[99449,3,9449],"./schemas/examples/array/additionalItems1.json":[99449,3,9449],"./schemas/examples/array/additionalItems2":[58769,3,8769],"./schemas/examples/array/additionalItems2.json":[58769,3,8769],"./schemas/examples/array/contains":[36943,3,6943],"./schemas/examples/array/contains.json":[36943,3,6943],"./schemas/examples/array/items":[19487,3,9487],"./schemas/examples/array/items.json":[19487,3,9487],"./schemas/examples/array/length":[56532,3,6532],"./schemas/examples/array/length.json":[56532,3,6532],"./schemas/examples/array/minContainsAndMaxContains":[78811,3,8811],"./schemas/examples/array/minContainsAndMaxContains.json":[78811,3,8811],"./schemas/examples/array/simple":[11200,3,1200],"./schemas/examples/array/simple.json":[11200,3,1200],"./schemas/examples/array/tuples":[20647,3,647],"./schemas/examples/array/tuples.json":[20647,3,647],"./schemas/examples/array/unevaluatedItems1":[75331,3,5331],"./schemas/examples/array/unevaluatedItems1.json":[75331,3,5331],"./schemas/examples/array/unevaluatedItems2":[90264,3,264],"./schemas/examples/array/unevaluatedItems2.json":[90264,3,264],"./schemas/examples/array/uniqueItems":[36238,3,6238],"./schemas/examples/array/uniqueItems.json":[36238,3,6238],"./schemas/examples/boolean/simple":[86186,3,6186],"./schemas/examples/boolean/simple.json":[86186,3,6186],"./schemas/examples/generic_keywords/annotations":[71612,3,1612],"./schemas/examples/generic_keywords/annotations.json":[71612,3,1612],"./schemas/examples/generic_keywords/const":[19485,3,9485],"./schemas/examples/generic_keywords/const.json":[19485,3,9485],"./schemas/examples/generic_keywords/enum":[91097,3,1097],"./schemas/examples/generic_keywords/enum.json":[91097,3,1097],"./schemas/examples/null/simple":[14773,3,4773],"./schemas/examples/null/simple.json":[14773,3,4773],"./schemas/examples/numeric/integer":[16577,3,6577],"./schemas/examples/numeric/integer.json":[16577,3,6577],"./schemas/examples/numeric/multipleOf":[43089,3,3089],"./schemas/examples/numeric/multipleOf.json":[43089,3,3089],"./schemas/examples/numeric/number":[64753,3,4753],"./schemas/examples/numeric/number.json":[64753,3,4753],"./schemas/examples/numeric/ranges":[26769,3,6769],"./schemas/examples/numeric/ranges.json":[26769,3,6769],"./schemas/examples/object/additionalProperties":[60442,3,442],"./schemas/examples/object/additionalProperties.json":[60442,3,442],"./schemas/examples/object/additionalProperties2":[77034,3,7034],"./schemas/examples/object/additionalProperties2.json":[77034,3,7034],"./schemas/examples/object/additionalPropertiesWithPatternProperties":[75567,3,5567],"./schemas/examples/object/additionalPropertiesWithPatternProperties.json":[75567,3,5567],"./schemas/examples/object/patternProperties":[86310,3,6310],"./schemas/examples/object/patternProperties.json":[86310,3,6310],"./schemas/examples/object/properties":[40307,3,307],"./schemas/examples/object/properties.json":[40307,3,307],"./schemas/examples/object/propertyNames":[90353,3,353],"./schemas/examples/object/propertyNames.json":[90353,3,353],"./schemas/examples/object/required":[88052,3,8052],"./schemas/examples/object/required.json":[88052,3,8052],"./schemas/examples/object/simpleObject":[56631,3,6631],"./schemas/examples/object/simpleObject.json":[56631,3,6631],"./schemas/examples/object/size":[6584,3,6584],"./schemas/examples/object/size.json":[6584,3,6584],"./schemas/examples/object/unevaluatedProperties":[44035,3,4035],"./schemas/examples/object/unevaluatedProperties.json":[44035,3,4035],"./schemas/examples/object/unevaluatedProperties1":[17266,3,7266],"./schemas/examples/object/unevaluatedProperties1.json":[17266,3,7266],"./schemas/examples/object/unevaluatedProperties2":[78280,3,8280],"./schemas/examples/object/unevaluatedProperties2.json":[78280,3,8280],"./schemas/examples/refs/localFile":[64595,3,4595],"./schemas/examples/refs/localFile.json":[64595,3,4595],"./schemas/examples/refs/refOnRoot":[34596,3,4596],"./schemas/examples/refs/refOnRoot.json":[34596,3,4596],"./schemas/examples/refs/remoteRef":[23909,3,3909],"./schemas/examples/refs/remoteRef.json":[23909,3,3909],"./schemas/examples/schema_composition/allOf":[47898,3,7898],"./schemas/examples/schema_composition/allOf.json":[47898,3,7898],"./schemas/examples/schema_composition/anyOf":[94496,3,4496],"./schemas/examples/schema_composition/anyOf.json":[94496,3,4496],"./schemas/examples/schema_composition/not":[9962,3,9962],"./schemas/examples/schema_composition/not.json":[9962,3,9962],"./schemas/examples/schema_composition/oneOf":[9142,3,9142],"./schemas/examples/schema_composition/oneOf.json":[9142,3,9142],"./schemas/examples/schema_conditionally/dependencies_dependentRequired":[27110,3,7110],"./schemas/examples/schema_conditionally/dependencies_dependentRequired.json":[27110,3,7110],"./schemas/examples/schema_conditionally/dependencies_dependentSchemas":[93685,3,3685],"./schemas/examples/schema_conditionally/dependencies_dependentSchemas.json":[93685,3,3685],"./schemas/examples/schema_conditionally/dependentRequired":[73445,3,3445],"./schemas/examples/schema_conditionally/dependentRequired.json":[73445,3,3445],"./schemas/examples/schema_conditionally/dependentRequired_bidirectional":[40458,3,458],"./schemas/examples/schema_conditionally/dependentRequired_bidirectional.json":[40458,3,458],"./schemas/examples/schema_conditionally/dependentSchemas":[66548,3,6548],"./schemas/examples/schema_conditionally/dependentSchemas.json":[66548,3,6548],"./schemas/examples/schema_conditionally/if-then-else":[97572,3,7572],"./schemas/examples/schema_conditionally/if-then-else.json":[97572,3,7572],"./schemas/examples/schema_conditionally/if-then-else_multiple":[17357,3,7357],"./schemas/examples/schema_conditionally/if-then-else_multiple.json":[17357,3,7357],"./schemas/examples/string/basic":[84857,3,4857],"./schemas/examples/string/basic.json":[84857,3,4857],"./schemas/examples/string/contentEncoding":[7974,3,7974],"./schemas/examples/string/contentEncoding.json":[7974,3,7974],"./schemas/examples/string/contentEncodingWithContentMediaType":[68367,3,8367],"./schemas/examples/string/contentEncodingWithContentMediaType.json":[68367,3,8367],"./schemas/examples/string/contentMediaType":[75157,3,5157],"./schemas/examples/string/contentMediaType.json":[75157,3,5157],"./schemas/examples/string/contentSchema":[4813,3,4813],"./schemas/examples/string/contentSchema.json":[4813,3,4813],"./schemas/examples/string/format":[5124,3,5124],"./schemas/examples/string/format.json":[5124,3,5124],"./schemas/examples/string/length":[22117,3,2117],"./schemas/examples/string/length.json":[22117,3,2117],"./schemas/examples/string/pattern":[2272,3,2272],"./schemas/examples/string/pattern.json":[2272,3,2272],"./schemas/examples/type/multipleType":[88447,3,8447],"./schemas/examples/type/multipleType.json":[88447,3,8447],"./schemas/examples/type/singleType":[50762,3,762],"./schemas/examples/type/singleType.json":[50762,3,762],"./schemas/realWorld/boxFileSchema":[63997,3,3997],"./schemas/realWorld/boxFileSchema.json":[63997,3,3997],"./schemas/realWorld/githubIssueSchema":[94524,3,4524],"./schemas/realWorld/githubIssueSchema.json":[94524,3,4524]};function t(e){if(!a.o(n,e))return Promise.resolve().then((()=>{var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}));var s=n[e],t=s[0];return a.e(s[2]).then((()=>a.t(t,16|s[1])))}t.keys=()=>Object.keys(n),t.id=2349,e.exports=t},23909:e=>{"use strict";e.exports=JSON.parse('{"type":"object","properties":{"externalProp":{"$ref":"https://raw.githubusercontent.com/jy95/docusaurus-json-schema-plugin/main/testsite/static/schemas/examples/array/tuples.json"}}}')}}]);