import{C as r}from"./QGDSComponent-ZBBO6_jp.js";const i=`{{!
    Component Name:       QGDS QOL Pagination 
    Component Version:    1.0
    Framework:            Bootstrap 5.3
    Reference:            https://getbootstrap.com/docs/5.0/components/pagination/
}}

<nav aria-label="{{ arialabel }}">

    <ul class="pagination">

        <li class="page-item previous {{ prev.classes }}">
            <a class="page-link" href="#" aria-label=" {{ prev.arialabel }} ">
                <span>{{ prev.linktext }}<span>
            </a>
        </li>
        
        {{ #pages }}
        <li class="page-item {{ classes }}">
            <a class="page-link" href="{{ href }}" aria-label=" {{ arialabel }} ">{{ linktext }}</a>
        </li>
        {{ /pages }}

        <li class="page-item next {{ next.classes }}">
            <a class="page-link" href="#" aria-label="{{ next.arialabel }}">
                <span>{{ next.linktext }}</span>
            </a>            
        </li>

    </ul>

</nav>`;class o{constructor(l={}){return new r(i,l)}}const p="Pagination for search results",c={href:"#",linktext:"",arialabel:"Previous page",classes:""},g={href:"#",linktext:"",arialabel:"Next page",classes:""},f=[{href:"#",linktext:"1"},{href:"#",linktext:"2"},{href:"#",linktext:"3"},{href:"#",linktext:"4"},{href:"#",linktext:"5",classes:"active"},{href:"#",linktext:"",classes:"more"},{href:"#",linktext:"7"},{href:"#",linktext:"8"},{href:"#",linktext:"9"},{href:"#",linktext:"10"}],x={arialabel:p,prev:c,next:g,pages:f},h={tags:["autodocs"],title:"Components/Pagination",render:a=>new o(a).html,argTypes:{}},e={args:x};var n,t,s;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: defaultdata
}`,...(s=(t=e.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};const k=["Default"];export{e as Default,k as __namedExportsOrder,h as default};
