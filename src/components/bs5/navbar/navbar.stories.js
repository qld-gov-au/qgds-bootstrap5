// Navbar.stories.js
import { Navbar } from './Navbar.js';
import { default_state, menu_state} from './navbar.data.json';

// megaMenu (dropdown) component
import { megaMenu } from '../megaMenu/megaMenu.js';
import menudata from '../megaMenu/megaMenu.data.json';

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
    megaMenu: ""
  }
}

// Default megaMenu story
const megamenu = new megaMenu(menudata);
export const WithMegaMenu = {
  args: { 
    ...menu_state,
    megaMenu: megamenu.html
  }
}