// Navbar.stories.js
import { Navbar } from './Navbar.js';
import { default_state, menu_state, test_states} from './navbar.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Navbar',
  render: (args) => new Navbar(args).html,
  argTypes: {
  },
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
    ...menu_state,
  },
  parameters: {
    backgrounds: {
      default: "Light",
      values: [{ name: "Light", value: "var(--qld-light-background)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="light">
          ${Story()}
      </div>
      `;
    },
  ],
};

// Navbar story with 'Alternative' color theme
export const Alternative = {
  args: {
    ...menu_state,
  },
  parameters: {
    backgrounds: {
      default: "Alternative",
      values: [{ name: "Alternative", value: "var(--qld-light-grey-alt)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="alt">
          ${Story()}
      </div>
      `;
    },
  ],
};

// Navbar story with 'Dark' color theme
export const Dark = {
  args: {
    ...menu_state,
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};

// Navbar story with 'DarkAlternative' color theme
export const DarkAlternative = {
  args: {
    ...menu_state,
  },
  parameters: {
    backgrounds: {
      default: "Dark alternative",
      values: [{ name: "Dark alternative", value: "var(--qld-dark-blue)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark-alt">
          ${Story()}
      </div>
      `;
    },
  ],
};