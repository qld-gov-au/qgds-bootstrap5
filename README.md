# Queensland Government Design System - Bootstrap 5 - Edition
A Queensland Online - Design System development space

Please see [For Gov - Queensland Government Design System](https://www.forgov.qld.gov.au/information-and-communication-technology/communication-and-publishing/website-and-digital-publishing/website-standards-guidelines-and-templates/queensland-government-design-system) for more details.

This is a BS5 flavour based on [QGDS Figma Design](https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?m=auto&node-id=6902-69802&t=q6FMpeH4XPs1hjP1-1). <br/>
Qld Health edition can be found at [design-system.health.qld.gov.au](https://www.design-system.health.qld.gov.au/).

This includes:
- Public NPM Release packages:
  - https://www.npmjs.com/package/@qld-gov-au/qgds-bootstrap5
  - https://github.com/qld-gov-au/qgds-bootstrap5/pkgs/npm/qgds-bootstrap5
- Squiz Git bridge dist/binary repo: https://github.com/qld-gov-au/qgds-bootstrap5-release
- Git CDN repo: https://github.com/qld-gov-au/qgds-bootstrap5-cdn


## Technical overview

- ES6 Javascript
- ESbuild for bundling, minification and transpiling
- Storybook for component development and documentation
- Mustache JS / Handlebars JS for component and HTML templating
- Figma for design and prototyping
- CSS/SCSS, extending Bootstrap 5.3 core components with custom CSS properties
- NPM for package management


## Documentation

- Storybook examples available at [https://qld-gov-au.github.io/qgds-bootstrap5/](https://qld-gov-au.github.io/qgds-bootstrap5/)


## Development Getting started

### Personal Development
This repo is designed to allow easy forking.  <br/>
Do enable GitHub Actions post forking and GitHub pages via GitHub actions  <br/>
Also do configure your own personal chromatic to ease development in providing delta change diff-ing.

We welcome external contributors, so don't be afraid to raise PR's back to this repo for inclusion into core deployment + cdn repo.

### GitHub Actions
This repo includes many workflows to reduce developer overheads. This includes but not limited to:
* CICD on all commit's and PR's
* GitHub io static document deployment based on develop/main
* Dependabot auto patching + storybook upgrade feature
* One click npm versioning publish (patch, minor, major) **
* Auto generate release notes based on PR's created (On version Tag)
* Npm js package publish (On version Tag) ***
* GitHub package Publish (On version Tag) ****

** Must configure GitHub service account ssh private key loaded into GitHub actions secret ``DEPLOY_KEY``<br/>
*** Must have npm js token loaded into GitHub actions secrets ``NPM_TOKEN`` to allow publishing.<br/>
**** Switch's @qld-gov-au with forked username (lowercase) and publish to your account see .github/workflows/githubPackage.yml step ``Update package scope, export package name``.

### Quick build
If you hava java and maven installed. This will pull in a local node/npm version and run through the full lifecycle build.

```bash
git clone https://github.com/qld-gov-au/qgds-bootstrap5
cd qgds-bootstrap5
mvn install
```

### Standard build
1. Download
  
    ```bash
    git clone https://github.com/qld-gov-au/qgds-bootstrap5
    ```

2. Setup

   Prerequisites
   - Node 18.17.1+
   - NPM 10.2.5+

3. Install dependencies
    
    ```bash
    npm install
    ```

4. Build the Design System CSS, Components and templates
    
    ```bash
    npm run build
    ```

6.  Start Watch and Storybook for component development
        
    ```bash
    npm run dev-storybook
    ```
     Alt:
     ```bash
     npm run watch
     npm run storybook
     ```

7. Lint
   ```bash
   npm run lint
   ```

* Static view, start a local server from /dist folder
    
    ```bash
    npm run serve
    ```

* Next steps

   - HTML templating using drop in components 
  
     If you wish to use the includes handle bars, please ensure 
   "handlebars": "4.7.8" + is loaded prior to running handlebars.helpers.bundle.js
   - Dev build and testing branching

### IDE Development suggestions

We recommend using VSCode as the IDE for development with the following plugins:

- Prettier
- ESLint
- Mustache JS or Handlebars JS template support

Webstorm also works.