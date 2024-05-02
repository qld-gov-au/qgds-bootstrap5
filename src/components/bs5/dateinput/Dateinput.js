import Component from '../../../js/QGDSComponent.js'
import template from "./dateinput.hbs?raw";

export class Dateinput {

  // Use the global Component class to create a new instance of the Date input component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument. 

  constructor(data = {}) {
    var component = new Component(template, data);
    this.dateInputs();
    return component;
  }

  dateInputs() {
    let elements = document.querySelectorAll(".dayinput, .monthinput, .yearinput");

    Array.from(elements).forEach(function (element) {
      element.addEventListener('keyup', function () {
        const input = event.currentTarget;
        let max = 0;
        if (input.value) {
          if (input.classList.contains('dayinput')) {
            max = 31;
          } else if (input.classList.contains('monthinput')) {
            max = 12;
          } if (input.classList.contains('yearinput')) {
            max = 2030;
          }
          if (!parseInt(input.value)) {
            input.classList.add('qld-input-error');
            input.blur();
          } else {
            if ((parseInt(input.value)) > max && !input.classList.contains('qld-input-error')) {
              input.classList.add('qld-input-error');
              input.blur();
            }
          }
        }
      });
    });
  }
}
