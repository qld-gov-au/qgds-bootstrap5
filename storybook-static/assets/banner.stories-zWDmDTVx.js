import{C as m}from"./QGDSComponent-ZBBO6_jp.js";import{B as u,d as b}from"./breadcrumbs.data-HiC8B4hB.js";const p=`<!-- QGDS Partial: banner -->

<div class="container-fluid qld-banner {{classes}}">

    <div class="container">
        <div class="row">
            
            <div class="col-12 col-md-7">

                {{{breadcrumbs}}}

                <h1 class="banner-title">{{{title}}}</h1>
                <p class="banner-lead">{{{content}}}</p>

            </div>

            <div class="col-12 col-md-5 position-relative">
                <div class="banner-image {{image.classes}}" data-image-url="{{image.url}}"></div>
            </div>

        </div>
    </div>

</div>`;class g{constructor(i={}){return new m(p,i)}}const v="banner-dark-alt",f="Blockquote title",h="Fees will increase from 1 July 2024. The new fees will be available on this page from 1 July 2024.",w={url:"assets/img/banner-example-3-to-2.jpg",classes:"banner-image--angle"},d={classes:v,title:f,content:h,image:w},C={tags:["autodocs"],title:"Components/Banner",render:s=>new g(s).html,argTypes:{}},e={args:{...d,breadcrumbs:""}},B=new u(b),a={args:{...d,breadcrumbs:B.html}};var n,r,t;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    breadcrumbs: ""
  }
}`,...(t=(r=e.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};var c,o,l;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    breadcrumbs: breadcrumbs.html
  }
}`,...(l=(o=a.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const D=["Default","WithBreadcrumbs"];export{e as Default,a as WithBreadcrumbs,D as __namedExportsOrder,C as default};
