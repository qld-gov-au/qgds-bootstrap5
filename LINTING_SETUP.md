# Linting Setup Documentation

This document describes the linting configuration for the QGDS Bootstrap5 project.

## Overview

The project now includes comprehensive linting support for:
- **JavaScript/TypeScript** - ESLint with TypeScript support
- **SASS/SCSS** - Stylelint
- **Lit/Web Components** - ESLint plugins for web components
- **JSON** - ESLint JSON plugin

## Installed Dependencies

### ESLint & Plugins
- `eslint` - Core ESLint
- `@typescript-eslint/parser` - TypeScript parser for ESLint
- `@typescript-eslint/eslint-plugin` - TypeScript-specific linting rules
- `eslint-plugin-lit` - Linting rules for Lit web components
- `eslint-plugin-wc` - Web Components linting rules
- `@eslint/json` - JSON linting support
- `eslint-plugin-storybook` - Storybook-specific rules

### Stylelint & Plugins
- `stylelint` - Core Stylelint
- `stylelint-config-standard-scss` - Standard SCSS configuration
- `stylelint-config-recommended` - Recommended base configuration
- `stylelint-scss` - SCSS-specific rules
- `postcss-scss` - SCSS syntax parser

### TypeScript
- `typescript` - TypeScript compiler and language support

## Configuration Files

### ESLint Configuration
**File:** `eslint.config.js`

The ESLint configuration uses the new flat config format (ESLint 9.x) and includes:
- JavaScript/ES2021+ rules
- TypeScript support with type-aware linting
- Lit and Web Components plugins
- JSON linting
- Storybook plugin integration

Key features:
- Flat config format (modern ESLint)
- TypeScript parsing with project references
- Lit/Web Components recommended rules
- Custom ignores for build outputs and generated files

### Stylelint Configuration
**File:** `.stylelintrc.json`

The Stylelint configuration extends standard SCSS configs and includes:
- SCSS-specific rules
- PostCSS SCSS syntax support
- Relaxed rules for compatibility with existing codebase
- Auto-fix support for common issues

### TypeScript Configuration
**File:** `tsconfig.json`

TypeScript configuration for the project with:
- ES2020 target
- ESNext modules
- DOM and ES2020 lib support
- Strict mode enabled
- Experimental decorators (for Lit)
- Source maps and declarations

## Available Scripts

### Linting Commands
```bash
# Run ESLint with auto-fix
npm run lint

# Run ESLint check only (no auto-fix)
npm run lint:check

# Run Stylelint with auto-fix
npm run lint:css

# Run Stylelint check only (no auto-fix)
npm run lint:css:check

# Run all linting
npm run lint:all
```

### CI Integration
The `ci:all` script has been updated to include both ESLint and Stylelint:
```bash
npm run ci:all
```

## Ignored Files

### ESLint Ignores (in eslint.config.js)
- `*.min.js` - Minified JavaScript
- `storybook-static/**` - Storybook build output
- `dist/**` - Build output
- `docs/**` - Documentation
- `src/js/handlebars.init.cjs` - Generated file
- `src/js/handlebars.partials.js` - Generated file
- `package-lock.json` - Lock file
- `node_modules/**` - Dependencies

### Stylelint Ignores (in .stylelintignore)
- `dist/**` - Build output
- `storybook-static/**` - Storybook build output
- `node_modules/**` - Dependencies
- `*.min.css` - Minified CSS
- `docs/**` - Documentation

## Usage with Vite

While the project currently uses ESBuild for building, the linting configuration is compatible with Vite. If you migrate to Vite:

1. Vite includes ESBuild internally for fast transpilation
2. The ESLint and Stylelint configs will work seamlessly
3. Consider adding `vite-plugin-eslint` for build-time linting

## Customization

### Adding Custom Rules

#### ESLint
Edit `eslint.config.js` and add rules to the appropriate configuration block:

```javascript
{
  files: ["**/*.ts"],
  rules: {
    "your-rule": "warn"
  }
}
```

#### Stylelint
Edit `.stylelintrc.json` and add rules to the `rules` object:

```json
{
  "rules": {
    "your-rule": "warn"
  }
}
```

## IDE Integration

### VS Code
Install these extensions for the best experience:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Stylelint** (`stylelint.vscode-stylelint`)
- **TypeScript and JavaScript Language Features** (built-in)

Recommended VS Code settings:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.validate": ["css", "scss"],
  "css.validate": false,
  "scss.validate": false
}
```

### WebStorm/IntelliJ IDEA
- ESLint and Stylelint are supported out of the box
- Enable them in: Settings → Languages & Frameworks → JavaScript → Code Quality Tools

## Troubleshooting

### ESLint Issues
1. **"Cannot find module '@typescript-eslint/parser'"**
   - Run `npm install` to ensure all dependencies are installed

2. **"Parsing error: Cannot read file 'tsconfig.json'"**
   - Ensure `tsconfig.json` exists in the project root
   - Check that the file is valid JSON

### Stylelint Issues
1. **"Unknown rule" errors**
   - Ensure all Stylelint plugins are installed
   - Run `npm install` to verify dependencies

2. **Syntax errors in SCSS files**
   - Check that `postcss-scss` is installed
   - Verify `.stylelintrc.json` includes `"customSyntax": "postcss-scss"`

## Future Enhancements

Consider adding:
- **Prettier** - Code formatting (can work alongside ESLint/Stylelint)
- **Husky pre-commit hooks** - Run linting before commits (already configured)
- **lint-staged** - Run linters on staged files only for faster pre-commit
- **ESLint Plugin Import** - Sort and validate imports
- **Stylelint Order** - Enforce CSS property ordering
