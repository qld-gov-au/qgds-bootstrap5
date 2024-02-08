import{C as a}from"./QGDSComponent-ZBBO6_jp.js";const s=`<!-- QGDS Component: Breadcrumbs -->

<div class="row">
    <div class="col-12">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {{#breadcrumbs}}
                <li class="breadcrumb-item {{linkclass}}">
                    <a href="{{link}}">{{linktext}}</a>
                </li>
                {{/breadcrumbs}}
            </ol>
        </nav>
    </div>
</div>`;class c{constructor(n={}){return new a(s,n)}}const l=[{linkclass:"",link:"#",linktext:"Home"},{linkclass:"",link:"#",linktext:"Topic"},{linkclass:"active",link:"#",linktext:"Current page"}],t={breadcrumbs:l};export{c as B,t as d};
