import{C as F}from"./QGDSComponent-ZBBO6_jp.js";const R=`<div class="alert {{classes}}" role="alert">
        
    <h4 class="alert-heading">{{{ heading }}}</h4>
    {{{ content }}}

    {{#dismiss}}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    {{/dismiss}}

</div>
`;class B{constructor(v={}){return new F(R,v)}}const H={classes:"alert-success",heading:"Road closure",content:"<p>The Bruce Highway is closed at Caloundara due to bushfire activity. <a href='#'>Find our more</a>.</p>",dismiss:!0},j={classes:"alert-info",heading:"Road closure",content:"The Bruce Highway is closed at Caloundara due to bushfire activity. <a href='#'>Find our more</a>.",dismiss:!0},I={classes:"alert-warning",heading:"Road closure",content:"The Bruce Highway is closed at Caloundara due to bushfire activity. <a href='#'>Find our more</a>.",dismiss:!0},Y={classes:"alert-danger",heading:"Road closure",content:"The Bruce Highway is closed at Caloundara due to bushfire activity. <a href='#'>Find our more</a>.",dismiss:!0},k={classes:"alert-light",heading:"Road closure",content:"The Bruce Highway is closed at Caloundara due to bushfire activity. <a href='#'>Find our more</a>.",dismiss:!0},U={classes:"alert-dark",heading:"Road closure",content:"The Bruce Highway is closed at Caloundara due to bushfire activity. <a href='#'>Find our more</a>.",dismiss:!0},t={success:H,info:j,warning:I,danger:Y,light:k,dark:U},M={tags:["autodocs"],title:"Components/Alert",render:n=>new B({...t.success,...n}).html,argTypes:{classes:{controls:!1,table:{disable:!0}},heading:{name:"Heading",defaultValue:"Default heading"},content:{name:"Content"},dismiss:{name:"Dismissable",control:{type:"boolean"},defaultValue:"Default dismiss content"}},parameters:{design:{name:"QGDS Figma Reference",type:"figma",url:"https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98125&mode=design&t=qwjFV2DLRYNST9Sr-0"},docs:{description:{component:"The Alert component is also known as Page Alert."}}}},e={name:"Success",args:{heading:"Your order has been completed",content:"Your order number is A-1234567890. A receipt has been sent to your email address."}},a={args:t.info},s={args:{...t.warning,heading:"I am a warning",content:"My data is merged with the Alert.warning example data object "}},r={args:t.danger};var o,c,i,d,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Success",
  args: {
    //Mustache {{ placeholder }} replacements
    heading: "Your order has been completed",
    content: "Your order number is A-1234567890. A receipt has been sent to your email address."
  }
}`,...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source},description:{story:"Use class <code>.alert-success</code>.",...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.description}}};var u,m,g,p,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  // Instead of passing an object per our Success alert, this example uses passes the exampleData object imported at the top of the module.
  args: exampleData.info
}`,...(g=(m=a.parameters)==null?void 0:m.docs)==null?void 0:g.source},description:{story:"Use class <code>.alert-info</code>.",...(h=(p=a.parameters)==null?void 0:p.docs)==null?void 0:h.description}}};var f,b,y,w,D;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  // This example does not specify any arguments, so the default values from the exampleData object will be used.
  args: {
    ...exampleData.warning,
    ...{
      heading: "I am a warning",
      content: "My data is merged with the Alert.warning example data object "
    }
  }
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source},description:{story:"Use class <code>.alert-warning</code>.",...(D=(w=s.parameters)==null?void 0:w.docs)==null?void 0:D.description}}};var x,S,C,A,T;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: exampleData.danger
}`,...(C=(S=r.parameters)==null?void 0:S.docs)==null?void 0:C.source},description:{story:"Use class <code>.alert-danger</code>.",...(T=(A=r.parameters)==null?void 0:A.docs)==null?void 0:T.description}}};const _=["Success","Info","Warning","Danger"];export{r as Danger,a as Info,e as Success,s as Warning,_ as __namedExportsOrder,M as default};
