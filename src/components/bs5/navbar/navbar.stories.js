// Navbar.stories.js
import { Navbar } from './Navbar.js';
import { default_state, menu_state, test_states} from './navbar.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Navbar',
  render: (args) => new Navbar(args).html,
  argTypes: {
  },
  decorators: [
    (Story, { parameters }) => {
      const { background } = parameters;
      return `
        <div class="${background}">
          ${Story()}
        </div>
      `;
    },
  ],
};

// Default navigation story
export const defaultState = {
  args: { 
    ...default_state,
  }
}

// Default megaMenu story
export const withFullMenuOptions = {
  args: { 
    ...menu_state,
  }
}

// Default megaMenu story
export const withMenuNoDescriptions = {
  args: { 
    ...test_states,
  }
}

// Navbar story with 'Light' color theme
export const LightMode = {
  args: {
    // Define args specific to Light mode
  },
  parameters: {
    backgrounds: {
      default: "Light",
      values: [{ name: "Light", value: "var(--qld-light-background)" }],
    },
  },
};

// Navbar story with 'Alternative' color theme
export const Alternative = {
  args: {
    // Define args specific to Light mode
  },
  parameters: {
    backgrounds: {
      default: "Alternative",
      values: [{ name: "Alternative", value: "var(--qld-light-grey-alt)" }],
    },
  },
};

// Navbar story with 'Dark' color theme
export const Dark = {
  args: {
    // Define args specific to Light mode
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
    },
  },
};

// Navbar story with 'DarkAlternative' color theme
export const DarkAlternative = {
  args: {
    // Define args specific to Light mode
  },
  parameters: {
    backgrounds: {
      default: "Dark alternative",
      values: [{ name: "Dark alternative", value: "var(--qld-dark-blue)" }],
    },
  },
};