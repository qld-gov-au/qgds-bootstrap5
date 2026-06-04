# QGDS Bootstrap 5 - Technical Documentation

This document provides technical information for developers working on the QGDS Bootstrap 5 library itself.

> **Looking to use QGDS in your project?** See the [Getting Started Guide](https://qld-gov-au.github.io/qgds-bootstrap5/?path=/docs/getting-started--docs) instead.

---

## Technical Stack

- **JavaScript:** ES6+
- **Build Tool:** ESbuild
- **Documentation:** Storybook 8.x
- **Templating:** Handlebars 4.7.8+
- **Styling:** SCSS extending Bootstrap 5.3
- **Testing:** Vitest with JSDOM
- **Package Manager:** npm

---

## Development Setup

### Prerequisites

- **Node.js** 18.17.1 or higher
- **npm** 10.2.5 or higher
- **Git**
- **Java & Maven** (optional, for alternative build method)

### Clone and Install

```bash
git clone https://github.com/qld-gov-au/qgds-bootstrap5
cd qgds-bootstrap5
npm install
```

---

Build Commands
Standard build:

Watch mode (rebuild on file changes):

Build with theme variants:

This generates alternative CSS files named qld.${ThemePaletteName}.bootstrap.css.

Quick build with Maven (if Java installed):

This pulls a local Node/npm version and runs the full build lifecycle.

---

Development Workflow
Start Storybook for Development
Combined command (watch + Storybook):

Or run separately:

**Testing**

Run unit tests:

Run tests with browser UI:

Example test: accordion.test.js

Linting

- Serve Built Files Locally
- Serves the dist folder for local testing

---

## Project Structure

```text
qgds-bootstrap5/
├── .esbuild/              # ESbuild plugins and helpers
├── .github/               # GitHub Actions workflows
├── .storybook/            # Storybook configuration
├── dist/                  # Build output (gitignored)
├── src/
│   ├── components/
│   │   └── bs5/          # Component templates, JS, SCSS
│   ├── css/              # Global SCSS files
│   ├── js/               # Core JS utilities
│   └── stories/          # Storybook documentation
├── test/                  # Test files
├── esbuild.js            # ESbuild configuration
├── package.json          # npm dependencies and scripts
└── README.md             # Project overview
```

---

## Component File Structure

Each component typically includes:

```text
component-name/
├── component-name.hbs          # Handlebars template
├── ComponentName.js            # Component factory class
├── component-name.data.json    # Sample data
├── component-name.stories.js   # Storybook stories
├── component-name.scss         # Component styles
├── component-name.test.js      # Unit tests (optional)
└── metadata.json               # Component metadata
```

---

## Build System

ESbuild Configuration

The project uses ESbuild with custom plugins:

- qgds-plugin-handlebar-partial-builder - Auto-registers Handlebars partials
- qgds-plugin-raw-loader - Loads .hbs files as raw strings
- qgds-plugin-clean-output-folders - Cleans dist folder before build
- qgds-plugin-copy-assets - Copies static assets
- qgds-plugin-generate-icon-assets - Generates icon assets
- qgds-plugin-version - Injects version info

Build Outputs

```text
dist/
├── assets/
│   ├── css/
│   │   ├── qld.bootstrap.css          # Main stylesheet
│   │   └── qld.bootstrap.legacy.css   # Legacy theme
│   ├── js/
│   │   ├── qld.bootstrap.min.js       # Component behaviors
│   │   └── handlebars.init.min.js     # Handlebars initialization
│   └── img/                           # Static images and icons
└── components/                        # Raw component files
│   └── bs5/
│       └── [component folders]
└── sample-data/                # Sample JSON data files
    └── [component data files]
```

## Publishing & Distribution

NPM Publishing

The project uses GitHub Actions for automated publishing:

Code and Release Repositories

- Source repository - Development and source code
- Release repository - Squiz Git bridge / binary distribution
- CDN repository - CDN static files

CDN Hosted Resources
The library's CSS and JS files are hosted on Queensland Government's CDN for easy inclusion in web projects.

- Production: https://static.qgov.net.au/qgds-bootstrap5/...
- Staging: https://staging-static.qgov.net.au/qgds-bootstrap5/...
- Development: https://dev-static.qgov.net.au/qgds-bootstrap5/...

---

## Contributing

Forking for Personal Development

This repository is designed for easy forking:

1. Fork the repository
2. Enable GitHub Actions in your fork
3. Enable GitHub Pages (via GitHub Actions)
4. Configure Chromatic for visual regression testing (optional)

---

## IDE Recommendations

VS Code Extensions

- Prettier - Code formatting
- ESLint - JavaScript linting
- Handlebars - Handlebars template support
- SCSS IntelliSense - SCSS autocompletion

---

## Accessibility Testing

This project follows Queensland Government accessibility requirements:

- Automated testing: Built into Storybook via @storybook/addon-a11y
- Manual testing: Keyboard navigation, screen readers
- WCAG 2.2 Level AA: All components tested against this standard

---

## Support
