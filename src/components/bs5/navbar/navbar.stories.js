// Navbar.stories.js
import { Navbar } from './Navbar.js';
import { default_state, menu_state} from './navbar.data.json';

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
export const withMenu = {
  args: { 
    ...menu_state,
  }
}