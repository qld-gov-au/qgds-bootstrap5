const loadedThemes = new Map();
const themeStyleElements = new Map();
let currentTheme = null;

const themeModules = {
  default: () => import("../src/css/main.scss"),
  corporate: () => import("../src/css/themes/main.corporate.test.scss"),
};

const unloadTheme = (themeName) => {
  // Cache current theme's style elements before removing
  if (currentTheme && !themeStyleElements.has(currentTheme)) {
    const currentStyleElements = [];
    const styleElements = document.querySelectorAll('style[data-vite-dev-id]');
    styleElements.forEach(element => {
      const viteId = element.getAttribute('data-vite-dev-id');
      if (viteId && viteId.match(/.*\/src\/css\/*main.*\.scss$/)) {
        currentStyleElements.push(element.cloneNode(true));
        element.remove();
      }
    });
    if (currentStyleElements.length > 0) {
      themeStyleElements.set(currentTheme, currentStyleElements);
    }
  } else {
    // Remove existing style elements for current theme
    const styleElements = document.querySelectorAll('style[data-vite-dev-id]');
    styleElements.forEach(element => {
      const viteId = element.getAttribute('data-vite-dev-id');
      if (viteId && viteId.match(/.*\/src\/css\/main.*\.scss$/)) {
        element.remove();
      }
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
      const styleElements = document.querySelectorAll('style[data-vite-dev-id]');
      styleElements.forEach(element => {
        const viteId = element.getAttribute('data-vite-dev-id');
        if (viteId && viteId.match(/.*\/src\/css\/main.*\.scss$/)) {
          newStyleElements.push(element.cloneNode(true));
        }
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
