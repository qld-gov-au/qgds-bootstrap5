// .storybook/modes.js

export const allModes = {
  mobile: {
    viewport: "iphone12",
  },
  desktop: {
    viewport: "large",
  },
  "Light": {
    theme: "light",
  },
  "Light alternative": {
    theme: "alt",
  },
  "Dark": {
    theme: "dark",
  },
  "Dark alternative": {
    theme: "dark-alt",
  }
};

export const allBackgrounds = {
default: {name: 'default', value: '#FFFFFF'},
"Light": {name: 'Light', value: "var(--qld-light-background)"},
"Light alternative": {name: 'Light alternative', value: "var(--qld-light-grey-alt)"},
"Dark": {name: 'Dark', value: "var(--qld-sapphire-blue)"},
"Dark alternative": {name: 'Dark alternative', value: "var(--qld-dark-blue)"},
}

