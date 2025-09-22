// Type definitions for handlebars template imports
declare module "*.hbs" {
  const content: string;
  export default content;
}

declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

// Type definitions for JSON imports
declare module "*.json" {
  const value: any;
  export default value;
}

// Type definitions for QGDSComponent
declare module "../../../js/QGDSComponent.js" {
  export default class Component {
    template: string;
    data: any;
    compiled: any;

    constructor(template: string, data: any);

    // Add other methods as needed
    render(): string;
  }
}
