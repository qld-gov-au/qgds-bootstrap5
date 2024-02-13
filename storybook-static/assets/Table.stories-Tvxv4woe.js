import{C as G}from"./QGDSComponent-ZBBO6_jp.js";const Q=`<!-- QGDS Component: Table -->

<div class="table-responsive qld-table">

    <table class="table {{classes}}">

        {{#data.caption}}
        <caption class="caption">
            {{data.caption}}
            <span class="sub-caption">{{{ subcaption }}}</span>
        </caption>
        {{/data.caption}}

        <thead>
            <tr>
                {{#headers}}
                <th scope="col">{{.}}</th>
                {{/headers}}
            </tr>
        </thead>

        <tbody>
            {{#rows}}
            <tr class="">
                {{#cells}}
                <td>{{.}}</td>
                {{/cells}}
            </tr>
            {{/rows}}
        </tbody>

        <tfoot>
            {{#footer}}
            <tr class="">
                {{#cells}}
                <td>{{.}}</td>
                {{/cells}}
            </tr>
            {{/footer}}
        </tbody>

    </table>
</div>`;class W{constructor(F={}){return new G(Q,F)}}const _="",j="Table caption",E="2021 - 2024",L=["Header","Header","Header"],O=[{cells:["Cell","Cell","Cell"]},{cells:["Cell","Cell","Cell"]},{cells:["Cell","Cell","Cell"]},{cells:["Cell","Cell","Cell"]},{cells:["Cell","Cell","Cell"]},{cells:["Cell","Cell","Cell"]}],X=[{cells:["Footer","Footer","Footer"]}],s={classes:_,caption:j,subcaption:E,headers:L,rows:O,footer:X},I={tags:["autodocs"],title:"Components/Table",render:e=>(typeof e.classes=="string"?e.classes=e.classes.replace(","," ").split(" "):typeof e.classes=="object"&&(e.classes=e.classes.join(" ")),new W(e).html),argTypes:{classes:{name:"Classes",description:"Settable classes for the component",control:{type:"check",labels:{"table-dark":"Dark","table-striped":"Striped","table-bordered":"Bordered","table-borderless":"Borderless","table-hover":"Hover","table-sm":"Small"}},options:["table-dark","table-striped","table-bordered","table-borderless","table-hover","table-sm"]},caption:{name:"Caption",description:"Table caption",control:{type:"text"}},subcaption:{name:"Subcaption",description:"Table subcaption",control:{type:"text"}}},parameters:{design:{name:"QGDS Figma Reference",type:"figma",url:"https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=23167-395552&mode=design&t=qoWXcELpZe1uqHs8-0"},docs:{controls:{exclude:["headers","rows","footer"]}}}},a={args:s},r={args:{...s,classes:"table-dark"}},t={args:{...s,classes:"table-striped"}},l={args:{...s,classes:"table-bordered"}},o={args:{...s,classes:"table-borderless"}},n={args:{...s,classes:"table-hover"}},c={args:{...s,classes:"table-sm"}};var d,p,i;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: defaultdata
}`,...(i=(p=a.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var b,m,u;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    ...{
      classes: "table-dark"
    }
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var f,g,C;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    ...{
      classes: "table-striped"
    }
  }
}`,...(C=(g=t.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var h,S,y;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    ...{
      classes: "table-bordered"
    }
  }
}`,...(y=(S=l.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var v,w,D;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    ...{
      classes: "table-borderless"
    }
  }
}`,...(D=(w=o.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var T,k,x;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    ...{
      classes: "table-hover"
    }
  }
}`,...(x=(k=n.parameters)==null?void 0:k.docs)==null?void 0:x.source}}};var B,H,q;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...defaultdata,
    ...{
      classes: "table-sm"
    }
  }
}`,...(q=(H=c.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};const K=["Default","DarkTheme","Striped","Bordered","Borderless","WithHover","Small"];export{l as Bordered,o as Borderless,r as DarkTheme,a as Default,c as Small,t as Striped,n as WithHover,K as __namedExportsOrder,I as default};
