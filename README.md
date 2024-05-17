# Queensland Online Design System development space

## Extends Bootstrap 5.3

## Technical overview

- ES6 Javascript
- ESbuild for bundling, minification and transpiling
- Storybook for component development
- Mustache JS / Handlebars JS for component and HTML templating
- Figma for design and prototyping
- CSS/SCSS, extending Bootstrap 5.3 core components with custom CSS properties
- NPM for package management

# Getting started

## 1. Download

```bash
git clone https://github.com/qld-gov-au/qgds-qol-mvp
```

## 2. Setup

### Prerequisites

- Node 18.17.1+
- NPM 10.2.5+

### Install dependencies

```bash
npm install
```

### Build the Desing System CSS, Components and templates

```bash
npm run build
```

### Watch for changes and rebuild automatically

```bash
npm run watch
```

### Start Storybook for component development and watch

```bash
npm run dev-storybook
```

### Start a local server from /dist folder

```bash
npm run serve
```

### Next steps

- HTML templating using drop in components 
  
  If you wish to use the includes handle bars, please ensure 
"handlebars": "4.7.8" + is loaded prior to running handlebars.helpers.bundle.js
- Dev build and testing branching

## Documentation

- Storybook examples available at [https://qld-gov-au.github.io/qgds-qol-mvp/](https://qld-gov-au.github.io/qgds-qol-mvp/)

## Development

We recommend using VSCode as the IDE for development with the following plugins:

- Prettier
- ESLint
- Mustache JS or Handlebars JS template support
