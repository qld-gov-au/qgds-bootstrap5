import{C as n}from"./QGDSComponent-ZBBO6_jp.js";const c=`<!-- QGDS Component: Callout -->

<div class="callout {{classes}}">
    <h3 class="callout-title">{{{title}}}</h3>
    <div class="callout-text">{{{content}}}</div>
</div>`;class r{constructor(l={}){return new n(c,l)}}const i="This is a callout title",u="This is a callout description",d={title:i,content:u},m={tags:["autodocs"],title:"Components/Callout",render:s=>new r(s).html,argTypes:{}},t={args:d};var a,e,o;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: defaultdata
}`,...(o=(e=t.parameters)==null?void 0:e.docs)==null?void 0:o.source}}};const C=["Default"];export{t as Default,C as __namedExportsOrder,m as default};
