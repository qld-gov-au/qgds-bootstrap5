// BackToTop.stories.js
import { BackToTop } from './backToTop.js';
import defaultdata from './backToTop.data.json';

export default {
  tags: ["autodocs"],
  title: "3. Components/BackToTop",
  render: (args) => new BackToTop(args).html,
  argTypes: {
    hide_back_to_top: { 
      control: 'boolean', 
    },
    has_icon: { 
      control: 'boolean',
    },
     min_page_height: { 
      name: "Minimum Page Height",
      description: 'Sets the minimum page height before the back to top button is displayed. This might be tricky to observe, as you will need to set the pages height using CSS to see the effect.',
      control: { 
        type: 'range', 
        min: 0,
        max: 4,
        step: 1
      } 
    }
  }
};

/**
 * Default blockquote
 */
export const Default = {
  args: defaultdata,
};

