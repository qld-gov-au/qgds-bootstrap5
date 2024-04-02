import Handlebars from "handlebars";

export default class Component {
  /**
   * Creates a new instance of the Component class.
   * @param {string} template - The template to render.
   * @param {object} data - The data to be used in the template.
   */

  constructor(template, data = {}) {
    
    this.template = template;
    this.data = data;
    this.compiled = Handlebars.compile(this.template)(this.data);
    
    // Debug via storybook and browser console
    // console.log(this.template);
    // console.log(this.data);
    // console.log(this.compiled);

    return {
      template: this.template,
      data: this.data,
      html: this.compiled,
    };
  }
}
