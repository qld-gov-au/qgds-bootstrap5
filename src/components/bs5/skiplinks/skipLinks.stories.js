import { SkipLinks } from "./SkipLinks";
import defaultData from "./skipLinks.data.json";

export default {
  // tags: ["autodocs"],
  title: "3. Components/SkipLinks",
  render: (args) => new SkipLinks(args).html,
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
        ${Story()}
      <div style="height: 100vh">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
       <main id="content">Here is the main content.</main>
      <nav id="main-nav"><ul><li>Here</li><li> is</li><li> the</li> <li>main</li> <li>nav</li></nav>`;
    },
  ],
};
