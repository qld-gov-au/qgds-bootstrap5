
import "../dist/assets/js/bootstrap.min.js";
import "../dist/assets/js/main.js";
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

		},
		backgrounds: {
			values: [
        { name: 'default', value: '#FFFFFF' },
        { name: 'light', value: '#EFF4F9' },
        { name: 'alternative', value: '#E8E8E8' },
			],
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
