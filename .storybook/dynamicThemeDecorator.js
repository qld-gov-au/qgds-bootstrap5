const loadedThemes = new Map();
const themeStyleElements = new Map();
let currentTheme = null;

// Dynamic theme modules import for lazy loading
// Automatically generate theme modules based on available theme files
const themeModules = (() => {
  const modules = {
    default: () => import("../src/css/main.scss"),
  };

  // Get all theme files in the themes directory
  const themeContext = import.meta.glob("../src/css/main.*.scss", {
    eager: false,
  });

  for (const [path, moduleImporter] of Object.entries(themeContext)) {
    // Extract theme name from path (e.g., "../src/css/themes/main.test.scss" -> "test")
    const match = path.match(/(?:main\.)?(\w+)\.scss$/);
    if (match) {
      const themeName = match[1];
      // Only include main.*.scss files or individual theme files if no main.*.scss exists
      if (path.includes(`main.${themeName}.scss`)) {
        modules[themeName] = moduleImporter;
      } else if (
        !Object.keys(themeContext).some((p) =>
          p.includes(`main.${themeName}.scss`),
        )
      ) {
        // If no main.*.scss file exists for this theme, use the individual theme file
        modules[themeName] = moduleImporter;
      }
    }
  }

  return modules;
})();

function mapStyleElementsByTheme(callback) {
  // Handle both dev mode (style elements) and production mode (link elements)
  const styleElements = document.querySelectorAll('style[type="text/css"]');
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');

  styleElements.forEach((element) => {
    callback(element);
  });

  linkElements.forEach((element) => {
    callback(element);
  });
}

const unloadTheme = (themeName) => {
  // Cache current theme's style elements before removing
  // Remove existing style elements for current theme
  const currentStyleElements = [];
  const themeNotExist = themeName && !themeStyleElements.has(themeName);
  mapStyleElementsByTheme((element) => {
    if (themeNotExist) {
      currentStyleElements.push(element.cloneNode(true));
    }
    element.remove();
  });

  if (currentStyleElements.length > 0) {
    themeStyleElements.set(themeName, currentStyleElements);
  }
};

const loadTheme = async (themeName) => {
  // Unload current theme if it's different
  if (currentTheme && currentTheme !== themeName) {
    unloadTheme(currentTheme);
  }

  // If theme style elements are cached, restore them
  if (themeStyleElements.has(themeName)) {
    const cachedElements = themeStyleElements.get(themeName);
    cachedElements.forEach((element) => {
      document.head.appendChild(element.cloneNode(true));
    });
    currentTheme = themeName;
    return;
  }

  // If theme is already loaded, no need to reload
  if (loadedThemes.has(themeName)) {
    currentTheme = themeName;
    return;
  }

  const themeModuleImporter = themeModules[themeName];
  if (themeModuleImporter) {
    try {
      // Import the theme module to trigger SCSS loading
      await themeModuleImporter();

      // Cache the newly created style elements
      const newStyleElements = [];

      mapStyleElementsByTheme((element) => {
        newStyleElements.push(element.cloneNode(true));
      });
      if (newStyleElements.length > 0) {
        themeStyleElements.set(themeName, newStyleElements);
      }

      // Store references
      loadedThemes.set(themeName, true);
      currentTheme = themeName;
    } catch (error) {
      console.warn(`Failed to load theme: ${themeName}`, error);
    }
  }
};

export const withDynamicTheme = (Story, context) => {
  const { globals } = context;
  const themeName = globals.themeName || "default";

  loadTheme(themeName);

  return Story();
};

export const dynamicThemeGlobalTypes = {
  themeName: {
    name: "Theme Palette",
    description: "Theme palette selector",
    defaultValue: "default",
    toolbar: {
      icon: "switchalt",
      items: (() => {
        // Dynamically generate toolbar items from available themes
        const items = [{ value: "default", title: "Default theme palette" }];

        // Add items for all discovered themes
        Object.keys(themeModules).forEach((themeName) => {
          if (themeName !== "default") {
            const capitalizedName =
              themeName.charAt(0).toUpperCase() + themeName.slice(1);
            items.push({
              value: themeName,
              title: `${capitalizedName} theme palette`,
            });
          }
        });

        return items;
      })(),
      showName: true,
      dynamicTitle: true,
    },
  },
};
