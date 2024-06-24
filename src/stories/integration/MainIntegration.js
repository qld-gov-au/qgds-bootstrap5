/* global, __dirname */

import init from "./../../js/handlebars.init";
import Handlebars from 'handlebars';

export class MainIntegration {

  constructor(data, args = {}) {
    init(Handlebars);
    console.log("contracutor");
    this.data = data;
    this.args = args;

    this.template = data.template;
    // Compile the template
    this.compiled = Handlebars.compile(this.template)(this.data);

    // For debugging purposes
    console.log('Template:', this.template);
    console.log('Data:', this.data);
    //console.log('Compiled:', this.compiled);

    return {
      template: this.template,
      data: this.data,
      html: this.compiled,
    };
  }
}
