import Component from '../../../js/QGDSComponent.js'
import template from "./card.hbs?raw";

export class Card {
  constructor( data = {} ) {
    return new Component(template, data);
  }
}
