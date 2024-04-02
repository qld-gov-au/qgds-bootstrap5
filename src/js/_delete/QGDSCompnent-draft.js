import mustache from "mustache";

let componentName = 'Alert';

import(`../components/bs5/${componentName}.html?raw`)
  .then(module => {
    // eslint-disable-next-line no-unused-vars
    let Alert = module.default;
    // You can now use Alert
  })
  .catch(error => {
    console.error(`Failed to load module: ${error}`);
  });
import Alert from "../components/bs5/alert.html?raw";


export default class Component {
  /**
	 * Represents a QGDS component.
	 * @constructor
	 * @param {Object} options - The options for the component.
	 * @param {string} options.name - The name of the component.
	 * @param {Object} [options.data={}] - The data for the component.
     * 
     * Use:
     * import Component from "./QGDSComponent.js";
     * 
     * const Alert = new Component("Alert", { heading: "This is a heading", content: "This is the content" });
	 */

  constructor(name, { data = {} }) {
    this.name = name.toLowerCase();
    this.data = data; 
  }



  template() {
    return Alert;
  }

  render() {
    return mustache.render(this.template(), { ...this.data });
  }

}
