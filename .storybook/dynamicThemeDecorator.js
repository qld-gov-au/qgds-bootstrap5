const loadedThemes = new Map();
const themeStyleElements = new Map();
let currentTheme = null;

const themePattern = /main\.(corporate|default)\.test\.scss/;

const themeModules = {
  default: () => import("../src/css/main.scss"),
  corporate: () => import("../src/css/themes/main.corporate.test.scss"),
};

function mapStyleElementsByTheme(themePattern, callback) {
  const styleElements = document.querySelectorAll('style[data-vite-dev-id]');
  styleElements.forEach(element => {
    const viteId = element.getAttribute('data-vite-dev-id');
    if (viteId && viteId.match(themePattern)) {
      callback(element);
    }
  })
}

const unloadTheme = (themeName) => {
  // Cache current theme's style elements before removing
  if (themeName && !themeStyleElements.has(themeName)) {
    const currentStyleElements = [];
    mapStyleElementsByTheme(themePattern, (element) => {
      currentStyleElements.push(element.cloneNode(true));
      element.remove();
    });
    if (currentStyleElements.length > 0) {
      themeStyleElements.set(themeName, currentStyleElements);
    }
  } else {
    // Remove existing style elements for current theme
    mapStyleElementsByTheme(themePattern, (element) => {
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

      mapStyleElementsByTheme(themePattern, (element) => {
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
    name: "Theme Name",
    description: "Dynamic theme selector",
    defaultValue: "default",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "default", title: "Default" },
        { value: "corporate", title: "Corporate" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};
