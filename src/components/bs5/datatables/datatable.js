import Component from '../../../js/QGDSComponent.js';
import template from "../table/table.hbs?raw";

// Dynamically load jQuery and DataTables
const loadDependencies = () => {
  return Promise.all([
    import('jquery').then(module => module.default),
    import('datatables.net'),
    import('datatables.net-bs5')
  ]);
};

export class DataTable {
  constructor(data = {}) {
    const component = new Component(template, data);
    this.html = component.html;

    // Initialize DataTables after the component is inserted into the DOM
    loadDependencies().then(([jQuery]) => {
      jQuery(document).ready(function() {
        jQuery('.table').DataTable();
      });
    });
  }
}
