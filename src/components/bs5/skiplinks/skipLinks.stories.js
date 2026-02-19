import { SkipLinks } from "./SkipLinks";
import defaultData from "./skipLinks.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/SkipLinks",
  render: (args) => new SkipLinks(args).html,
  parameters: {
    coderefs: {
      partialname: "skipLinks",
    },
  },
};

export const Default = {
  args: {
    skipLinks: [
      ...defaultData.skipLinks,
      { targetId: "i-dont-exist", label: "Skip to nowhere" },
    ],
  },
  decorators: [
    (Story) => {
      return `
      <p>click on this text then hit tab button see skiplinks in action. Use Enter to skip to the listed item.</p>
        ${Story()}
      <div style="height: 100vh"></div>
       <main id="content"><p>Here is the main content.</p>
       
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></main>
  <nav id="main-nav" tabindex="-1" ><ul><li><a href="#">Here</a></li><li> <a href="#">is</a></li><li><a href="#"> the</a></li> <li><a href="#">main</a   ></li> <li><a href="#">nav</a></li></nav>`;
    },
  ],
};
