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

- Node 18.17.1
- NPM 10.2.5

### Install dependencies

```bash
npm install
```

### Build the Desing System CSS, Components and templates

npm run **build** _or_ **node build.js**

### Watch for changes and rebuild automatically

npm run **watch** _or_ **node build.js --watch**

### Start Storybook for component development

npm run **storybook**

### Start a local server from /dist folder

npm run **serve**

### Next steps

- HTML templating using drop in components
- Dev build and testing branching

## Documentation

- Storybook examples available at [https://qld-gov-au.github.io/qgds-qol-mvp/](https://qld-gov-au.github.io/qgds-qol-mvp/)

## Development

We recommend using VSCode as the IDE for development with the following plugins:

- Prettier
- ESLint
- Mustache JS or Handlebars JS template support
