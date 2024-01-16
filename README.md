# QGDS Queensland Online development space

# Getting started

A Git client and Node.js are required to edit this template.

## 1. Download

```bash
git clone https://github.com/qld-gov-au/qgds-qol-mvp
```

## 2. Setup

**Make sure you have Node version >= 18.17.1 and NPM >= 10.2.5

```bash
npm install
```

Recommend using VSCode as the IDE for development.

## 3. NPM Scripts descriptions
| Name        | Description     |
| ------------- | ------------- |
| npm run **build**  | Builds the components and templates |
| npm run **serve** | Serves "dist" at a local server |
| npm **start**  | Builds the components and templates and serves at a local server |
| npm run **build:templates** | Creates example HTML pages using theh layouts and components files and data, and generates output file /dist/index.html |
| npm run **build:theme** or npm run **build:components** | Iterates over each src/component and exports HTML snippets - including their {{placeholders}} - to output directory dist/components/bs5/name/name.bs5.html.  