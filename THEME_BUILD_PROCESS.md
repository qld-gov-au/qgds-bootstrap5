# Theme Override Build Process Documentation

## Overview

The Queensland Government Design System (QGDS) Bootstrap 5 edition supports custom theme generation through a sophisticated build process that allows overriding default color variables and styles. This document explains how the theme build system works.

## Architecture

### Core Components

1. **`esbuild.js`** - Main build configuration and orchestration
2. **`.esbuild/helpers/scssOverrideTheme.js`** - Theme SCSS processing helper
3. **Theme files** - Located in `src/css/themes/`

## Build Process Flow

### 1. Theme Detection and Processing

When the `--theme` argument is provided to the build command:

```bash
npm run build:theme -- --theme=maroon
npm run build:theme -- --theme=maroon --theme=corporate  # Multiple themes
```

The build process:

1. **Parses CLI arguments** (lines 22-23 in `esbuild.js`)
   ```javascript
   const argv = minimist(process.argv.slice(2));
   ```

2. **Processes theme arrays** (lines 106-120 in `esbuild.js`)
   - Converts single theme to array if needed
   - Iterates through each theme specified

### 2. Theme SCSS Entry Generation

For each theme, the `createOverrideThemeScssEntry()` function:

1. **Locates theme file** at `src/css/themes/${themeVar}.scss`
2. **Reads main.scss** content
3. **Injects theme import** at the beginning:
   ```scss
   @import './themes/maroon.scss';
   // ... rest of main.scss content
   ```
4. **Creates temporary file** at `src/css/main.${themeVar}.scss`
5. **Returns temp file path** for build processing

### 3. Build Entry Points

The build system dynamically adds theme entry points:

```javascript
config.entryPoints.push({
  in: tempEntry,                              // Temporary theme SCSS file
  out: `./assets/css/qld.${themeVar}.bootstrap`, // Output CSS file
});
```

### 4. Output Generation

**Result:** Theme-specific CSS files are generated:
- `dist/assets/css/qld.maroon.bootstrap.css`
- `dist/assets/css/qld.corporate.bootstrap.css`

### 5. Cleanup Process

After successful build:
- Temporary SCSS files are automatically deleted
- Only the final CSS outputs remain

## Theme File Structure

### Theme Variable Files

Theme files in `src/css/themes/` should follow this pattern:

```scss
// src/css/themes/maroon.scss
// Variables Override File - Maroon Theme

// Core neutral colors
$core-default-color-neutral-black: #2C1810 !default;
$core-default-color-neutral-darkest: #3D2417 !default;
// ... other overrides

// Light theme colors
$color-default-color-light-action-primary: #A70240 !default;
$color-default-color-light-action-primary-hover: #8B0235 !default;
// ... other overrides
```

### Variable Override Strategy

The theme system uses SCSS `!default` flags to allow cascading overrides:

1. **Base variables** in `src/css/qld-tokens.scss` define defaults
2. **Theme variables** override specific values
3. **Import order** ensures theme variables take precedence

## Build Commands

### Single Theme Build
```bash
npm run build:theme -- --theme=maroon
```

### Multiple Theme Build
```bash
npm run build:theme -- --theme=maroon --theme=corporate
```

### Theme Build with Icons
```bash
npm run build:theme -- --theme=maroon --icons
```

### Development with Themes
```bash
npm run build:theme -- --theme=maroon --watch
```

## Error Handling

### Missing Theme Files
If a theme file doesn't exist:
```
[SCSS Theme] Warning: Theme variables file not found at src/css/themes/missing-theme.scss
```
- Build continues without theme injection
- Only base styles are included

### Temporary File Cleanup
- Temp files are tracked in `tempEntries` array
- Automatic cleanup on build completion
- Prevents file system pollution

## Integration with Package Exports

Theme CSS files are automatically available as package exports:

```json
{
  "exports": {
    "./qld.bootstrap.css": "./dist/assets/css/qld.bootstrap.css",
    "./qld.maroon.bootstrap.css": "./dist/assets/css/qld.maroon.bootstrap.css"
  }
}
```

## Storybook Integration

### Dynamic Theme Support

Storybook can load theme-specific CSS dynamically:

```bash
# Enable dynamic theme switching in Storybook
ENABLE_DYNAMIC_THEME=true npm run storybook
# or
npm run storybook:themes
```

### Theme Test Files

Test-specific theme files follow the pattern:
- `src/css/themes/main.${theme}.test.scss`
- Import theme variables and main.scss
- Used for Storybook theme switching

## Best Practices

### Theme Development

1. **Start with existing theme** as template
2. **Use semantic color names** for consistency
3. **Test across light/dark modes** if applicable
4. **Validate accessibility** contrast ratios

### Build Optimization

1. **Build specific themes** only when needed
2. **Use watch mode** during development
3. **Clean build output** regularly for accurate results

### Version Control

1. **Commit theme files** to source control
2. **Ignore temporary files** (handled automatically)
3. **Document theme purposes** and use cases

## Troubleshooting

### Common Issues

**Theme not applying:**
- Verify theme file exists in `src/css/themes/`
- Check SCSS syntax for errors
- Ensure variable names match base tokens

**Build failures:**
- Check for circular imports
- Verify SCSS compilation
- Review temporary file permissions

**Missing output files:**
- Confirm theme name matches file name
- Check build command syntax
- Verify output directory permissions

## Technical Details

### File Processing Pipeline

1. **CLI Parsing** → Theme detection
2. **File Generation** → Temporary SCSS creation
3. **ESBuild Processing** → SCSS compilation
4. **Asset Output** → CSS file generation
5. **Cleanup** → Temporary file removal

### Memory Management

- Temporary files are minimal (imports only)
- Automatic cleanup prevents accumulation
- Build process is stateless and repeatable

### Performance Considerations

- Theme builds add minimal overhead
- Parallel processing for multiple themes
- Efficient file I/O operations
- Cached compilation where possible
