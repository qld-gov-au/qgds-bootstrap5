const o={parameters:{actions:{argTypesRegex:"^on[A-Z].*"},hideNoControlsWarning:!0,expanded:!0,controls:{matchers:{color:/(background|color)$/i,date:/Date$/i}},html:{highlighter:{wrapLines:!1}},docs:{source:{excludeDecorators:!0},toc:{contentsSelector:".sbdocs-content",headingSelector:"h1, h2, h3",ignoreSelector:"#primary",title:"Table of Contents",disable:!1,unsafeTocbotOptions:{orderedList:!1}}}},decorators:[e=>`
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
					${e()}
					</div>
				</div>
			</div>
      		`]};export{o as default};
