const loadedThemes = new Map();
const themeStyleElements = new Map();
let currentTheme = null;

const themeModules = {
  default: () => import("../src/css/main.scss"),
  corporate: () => import("../src/css/themes/main.corporate.test.scss"),
  maroon: () => import("../src/css/themes/main.maroon.test.scss"),
};

function mapStyleElementsByTheme(callback) {
  // Handle both dev mode (style elements) and production mode (link elements)
  const styleElements = document.querySelectorAll('style[type="text/css"]');
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
  
  styleElements.forEach(element => {
    callback(element);
  });
  
  linkElements.forEach(element => {
    callback(element);
  });
}

const unloadTheme = (themeName) => {
  // Cache current theme's style elements before removing
  if (themeName && !themeStyleElements.has(themeName)) {
    const currentStyleElements = [];
    mapStyleElementsByTheme((element) => {
      currentStyleElements.push(element.cloneNode(true));
      element.remove();
    });
    if (currentStyleElements.length > 0) {
      themeStyleElements.set(themeName, currentStyleElements);
    }
  } else {
    // Remove existing style elements for current theme
    mapStyleElementsByTheme((element) => {
      element.remove();
    });
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
    cachedElements.forEach(element => {
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

  if (themeModules[themeName]) {
    try {
      // Import the theme module to trigger SCSS loading
      const module = await themeModules[themeName]();

      // Cache the newly created style elements
      const newStyleElements = [];

      mapStyleElementsByTheme((element) => {
        newStyleElements.push(element.cloneNode(true));
      });
      if (newStyleElements.length > 0) {
        themeStyleElements.set(themeName, newStyleElements);
      }

      // Store references
      loadedThemes.set(themeName, module);
      currentTheme = themeName;

      return module;
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
      items: [
        { value: "default", title: "Default theme palette" },
        { value: "corporate", title: "Corporate theme palette" },
        { value: "maroon", title: "Maroon theme palette" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};
