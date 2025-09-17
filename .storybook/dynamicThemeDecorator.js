const loadedThemes = new Map();
const themeStyleElements = new Map();
let currentTheme = null;

// Dynamic theme modules import for lazy loading
const themeModules = {
  default: () => import("../src/css/main.scss"),
  green: () => import("../src/css/themes/main.green.scss"),
  test: () => import("../src/css/themes/main.test.scss"),
};

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
    defaultValue: "test",
    toolbar: {
      icon: "switchalt",
      items: [
        { value: "default", title: "Default theme palette" },
        { value: "green", title: "Green theme palette" },
        { value: "test", title: "Test theme palette" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};
