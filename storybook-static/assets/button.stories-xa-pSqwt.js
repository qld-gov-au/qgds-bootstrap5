import{C as r}from"./QGDSComponent-ZBBO6_jp.js";const l=`<!-- // QGDS Component: Button -->
<!-- // https://getbootstrap.com/docs/5.3/components/buttons -->

{{#isbutton}}
<button class="btn {{classes}}" onclick="{{{onclick}}}">
    {{label}}
</button>
{{/isbutton}}

{{#islink}}
<a class="btn {{classes}}" href="{{href}}" target="{{target}}" >
    {{label}}
</a>
{{/islink}}`;class c{constructor(a={}){return new r(l,a)}}const i="btn-outline-secondary",u=!1,m=!0,d="https://google.com",p="Call to action",b="_blank",g={classes:i,isbutton:u,islink:m,href:d,label:p,target:b},f={tags:["autodocs"],title:"Components/Button",render:n=>new c(n).html,argTypes:{classes:{name:"Classes",description:"Settable classes for the component",control:{type:"radio",labels:{"btn-primary":"Primary","btn-secondary":"Secondary","btn-outline-primary":"Primary outline","btn-outline-secondary":"Secondary outline"}},options:["btn-primary","btn-secondary","btn-outline-primary","btn-outline-secondary"]}},parameters:{design:{name:"QGDS Figma Reference",type:"figma",url:"https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98058&mode=design&t=YBUAJHIxqF46Um9y-0"},docs:{controls:{}}}},t={args:g};var e,s,o;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: defaultdata
}`,...(o=(s=t.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const h=["Default"];export{t as Default,h as __namedExportsOrder,f as default};
