// Navbar.stories.js
import { Header } from './Header.js';
import { default_state, sub_brand, co_brand, endorsed, standalone} from './header.data.json';

export default {
    tags: ['autodocs'],
    title: 'Components/Header',
    render: (args) => new Header(args).html,
    argTypes: {
    },
};

// Default navigation story
export const Masterbrand = {
    args: {
        ...default_state,
    }
}

// Default navigation story
export const Subbrand = {
    args: {
        ...sub_brand,
    }
}

// Default navigation story
export const Cobrand = {
    args: {
        ...co_brand,
    }
}

// Default navigation story
export const Endorsed = {
    args: {
        ...endorsed,
    }
}

// Default navigation story
export const Standalone = {
    args: {
        ...standalone,
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
        // Define args specific to Light mode
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
        // Define args specific to Light mode
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
        // Define args specific to Light mode
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