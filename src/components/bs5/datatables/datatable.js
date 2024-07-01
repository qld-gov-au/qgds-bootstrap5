import Component from '../../../js/QGDSComponent.js';
import template from "../table/table.hbs?raw";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';

export class DataTable {
  constructor(data = {}) {
    const component = new Component(template, data);
    this.html = component.html;

    // Initialize DataTables
    $(document).ready(function() {
      $('.table').DataTable();
    });
  }
}
