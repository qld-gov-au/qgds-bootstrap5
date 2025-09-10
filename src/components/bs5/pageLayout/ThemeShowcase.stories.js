export default {
  title: "5. Templates/Theme Showcase",
  render: (args) => {
    return args.content;
  },
  argTypes: {
    themeClass: {
      control: { type: 'select' },
      options: ['', 'default', 'light', 'alt', 'dark', 'dark-alt'],
      description: 'Theme class to apply to the content area',
    },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: 'This showcase demonstrates the theme palette classes (.default, .light, .alt, .dark, .dark-alt) that automatically apply color and background-color styling.',
      },
    },
  },
};

/**
 * Default Theme
 * The default theme uses the base color scheme without additional background styling
 */
export const DefaultTheme = {
  args: {
    content: `
      <div class="default p-4 mb-4 border">
        <h2>Default Theme</h2>
        <p>This demonstrates the default theme palette. It provides a clean, neutral appearance suitable for most content.</p>
        <a href="#" class="btn btn-primary me-2">Primary Button</a>
        <a href="#" class="btn btn-secondary">Secondary Button</a>
        
        <h3 class="mt-4">Background Utilities</h3>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="bg-default p-3 rounded">
              <strong>.bg-default</strong><br>
              Background using default theme color
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light p-3 rounded">
              <strong>.bg-light</strong><br>
              Background using light theme color
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light-alt p-3 rounded">
              <strong>.bg-light-alt</strong><br>
              Background using light alt color
            </div>
          </div>
        </div>
      </div>
    `,
  },
};

/**
 * Light Theme
 * The light theme provides a bright, clean appearance
 */
export const LightTheme = {
  args: {
    content: `
      <div class="light p-4 mb-4 border">
        <h2>Light Theme</h2>
        <p>This demonstrates the light theme palette. It provides enhanced readability with a light background.</p>
        <a href="#" class="btn btn-primary me-2">Primary Button</a>
        <a href="#" class="btn btn-secondary">Secondary Button</a>
        
        <h3 class="mt-4">Theme Features</h3>
        <ul>
          <li>Automatic color and background-color application</li>
          <li>Optimized contrast ratios</li>
          <li>Consistent styling across components</li>
        </ul>
      </div>
    `,
  },
};

/**
 * Alt Theme
 * The alt theme provides an alternative light styling
 */
export const AltTheme = {
  args: {
    content: `
      <div class="alt p-4 mb-4 border">
        <h2>Alt Theme</h2>
        <p>This demonstrates the alt theme palette. It provides a subtle alternative to the standard light theme.</p>
        <a href="#" class="btn btn-primary me-2">Primary Button</a>
        <a href="#" class="btn btn-secondary">Secondary Button</a>
        
        <blockquote class="blockquote mt-4">
          <p>"The alt theme provides visual variety while maintaining accessibility standards."</p>
          <footer class="blockquote-footer">QLD Design System</footer>
        </blockquote>
      </div>
    `,
  },
};

/**
 * Dark Theme
 * The dark theme provides a bold, high-contrast appearance
 */
export const DarkTheme = {
  args: {
    content: `
      <div class="dark p-4 mb-4 border">
        <h2>Dark Theme</h2>
        <p>This demonstrates the dark theme palette. It provides excellent contrast and a modern appearance.</p>
        <a href="#" class="btn btn-primary me-2">Primary Button</a>
        <a href="#" class="btn btn-secondary">Secondary Button</a>
        
        <div class="alert alert-info mt-4">
          <h4 class="alert-heading">Dark Theme Benefits</h4>
          <p class="mb-0">Reduces eye strain in low-light conditions and provides a sophisticated appearance.</p>
        </div>
      </div>
    `,
  },
};

/**
 * Dark Alt Theme
 * The dark alt theme provides an alternative dark styling
 */
export const DarkAltTheme = {
  args: {
    content: `
      <div class="dark-alt p-4 mb-4 border">
        <h2>Dark Alt Theme</h2>
        <p>This demonstrates the dark alt theme palette. It provides a variation of the dark theme with different background styling.</p>
        <a href="#" class="btn btn-primary me-2">Primary Button</a>
        <a href="#" class="btn btn-secondary">Secondary Button</a>
        
        <h3 class="mt-4">Dark Utility Examples</h3>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="bg-dark p-3 rounded text-white">
              <strong>.bg-dark</strong><br>
              Dark background utility
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-dark-alt p-3 rounded text-white">
              <strong>.bg-dark-alt</strong><br>
              Dark alt background utility
            </div>
          </div>
        </div>
      </div>
    `,
  },
};

/**
 * Theme Comparison
 * Shows all themes in a single view for comparison
 */
export const ThemeComparison = {
  args: {
    content: `
      <div class="mb-4">
        <h2>Theme Palette Comparison</h2>
        <p>Compare all available theme classes side by side. Each theme automatically applies appropriate color and background-color styling.</p>
      </div>
      
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="default p-3 border">
            <h3>Default Theme</h3>
            <p>Base theme with neutral styling.</p>
            <a href="#" class="btn btn-sm btn-primary">Button</a>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="light p-3 border">
            <h3>Light Theme</h3>
            <p>Clean, bright appearance.</p>
            <a href="#" class="btn btn-sm btn-primary">Button</a>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="alt p-3 border">
            <h3>Alt Theme</h3>
            <p>Alternative light styling.</p>
            <a href="#" class="btn btn-sm btn-primary">Button</a>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="dark p-3 border">
            <h3>Dark Theme</h3>
            <p>High contrast, modern look.</p>
            <a href="#" class="btn btn-sm btn-primary">Button</a>
          </div>
        </div>
        
        <div class="col-12">
          <div class="dark-alt p-3 border">
            <h3>Dark Alt Theme</h3>
            <p>Alternative dark styling with different background treatment.</p>
            <a href="#" class="btn btn-sm btn-primary">Button</a>
          </div>
        </div>
      </div>
      
      <div class="mt-5">
        <h3>Background Utility Classes</h3>
        <p>These utilities can be used independently of theme classes for specific background styling:</p>
        <div class="row g-3">
          <div class="col-md-3">
            <div class="bg-default p-2 text-center rounded">.bg-default</div>
          </div>
          <div class="col-md-3">
            <div class="bg-light p-2 text-center rounded">.bg-light</div>
          </div>
          <div class="col-md-3">
            <div class="bg-light-alt p-2 text-center rounded">.bg-light-alt</div>
          </div>
          <div class="col-md-3">
            <div class="bg-dark p-2 text-center rounded text-white">.bg-dark</div>
          </div>
          <div class="col-md-3">
            <div class="bg-dark-alt p-2 text-center rounded text-white">.bg-dark-alt</div>
          </div>
          <div class="col-md-3">
            <div class="bg-default-shade p-2 text-center rounded">.bg-default-shade</div>
          </div>
          <div class="col-md-3">
            <div class="bg-light-shade p-2 text-center rounded">.bg-light-shade</div>
          </div>
          <div class="col-md-3">
            <div class="bg-light-alt-shade p-2 text-center rounded">.bg-light-alt-shade</div>
          </div>
        </div>
      </div>
    `,
  },
};