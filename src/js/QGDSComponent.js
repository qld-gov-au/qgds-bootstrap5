import mustache from "mustache";

export default class Component {
  /**
   * Creates a new instance of the Component class.
   * @param {string} template - The template to render.
   * @param {object} data - The data to be used in the template.
   */

  constructor(template, data = {}) {
    this.template = template;
    this.data = data;

    return {
      template: this.template,
      data: this.data,
      html: mustache.render(this.template, { ...this.data }),
    };
  }
}
