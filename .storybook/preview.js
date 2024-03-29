import { themes } from "@storybook/theming";

import "../dist/assets/css/qld.bootstrap.css";

const preview = {

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    hideNoControlsWarning: true,
    expanded: true,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    html: {
      highlighter: {
        wrapLines: false,
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
      },

      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },

  decorators: [
    (Story) => {
      return `
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
					${Story()}
					</div>
				</div>
			</div>
      		`;
    },
  ],
};

export default preview;
