import { useEffect } from "@storybook/preview-api";

const loadedThemes = new Map();
const themeStyleElements = new Map();
let currentTheme = null;

const themeModules = {
  'default': () => import('./themes/default.js'),
  'corporate': () => import('./themes/corporate.js'),
};

const unloadTheme = (themeName) => {
  const styleElement = themeStyleElements.get(themeName);
  if (styleElement && styleElement.parentNode) {
    styleElement.parentNode.removeChild(styleElement);
    themeStyleElements.delete(themeName);
  }
  
  // Remove module from cache to force reload
  if (loadedThemes.has(themeName)) {
    loadedThemes.delete(themeName);
  }
};

const loadTheme = async (themeName) => {
  // Unload current theme if it's different
  if (currentTheme && currentTheme !== themeName) {
    unloadTheme(currentTheme);
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
      
      // Store reference
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

  useEffect(() => {
    loadTheme(themeName);
  }, [themeName]);

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
