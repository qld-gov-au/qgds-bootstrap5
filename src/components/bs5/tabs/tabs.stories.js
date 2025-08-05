// ComponentExample.stories.js
import { Tabs } from "./tabs.js";
import defaultdata from "./tabs.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Tabs",
  render: (args) => {
    return new Tabs(args).html;
  },

  //https://storybook.js.org/docs/api/arg-types
  argTypes: {
    type_variant: {
      description: 'Type of tab system',
      control: "select",
      options: ["container-tabs", "section-tabs"],
    },
    variant: {
      description: 'Type variant for the tab system',
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
    tab_variant: {
      description: 'The previous sibling variant value is used to set the tab system colour scheme in the tab section component.',
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
    unique_id: {
      description: 'Each tab system must have a unique id',
      control: "text",
      defaultValue: "12345",
    },
  },

};

/**
 * 
 * Tabs - Section Tabs Default Dark
 */
export const SectionTabsDefaultDark = {
  args: defaultdata,
};

/**
 * Tabs - Container Tabs Default
 */
export const ContainerTabsDefault = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "234566",
    variant: "default",
    data: {
      items: [
        {   
          tab_text: "Tab label 1",
          title: "Section Heading (H3)",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 2",
          title: "Section Heading Item 2",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 3",
          title: "Section Heading Item 3",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 4",
          title: "Section Heading Item 4",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
          disabled: true,
        },
        {
          tab_text: "Tab label 5",
          title: "Section Heading Item 5",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 6",
          title: "Section Heading Item 6",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
      ],
    },
  },
};

/**
 * Tabs - Container Tabs Light
 */
export const ContainerTabsLight = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "345678",
    variant: "light",
    data: {
      items: [
        {   
          tab_text: "Tab label 1",
          title: "Section Heading (H3)",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 2",
          title: "Section Heading Item 2",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 3",
          title: "Section Heading Item 3",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 4",
          title: "Section Heading Item 4",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
          disabled: true,
        },
        {
          tab_text: "Tab label 5",
          title: "Section Heading Item 5",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 6",
          title: "Section Heading Item 6",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
      ],
    },
  },
};

/**
 * Tabs - Container Tabs Alt
 */
export const ContainerTabsAlt = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "456789",
    variant: "alt",
    data: {
      items: [
        {   
          tab_text: "Tab label 1",
          title: "Section Heading (H3)",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 2",
          title: "Section Heading Item 2",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 3",
          title: "Section Heading Item 3",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 4",
          title: "Section Heading Item 4",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
          disabled: true,
        },
        {
          tab_text: "Tab label 5",
          title: "Section Heading Item 5",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 6",
          title: "Section Heading Item 6",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
      ],
    },
  },
};

/**
 * Tabs - Container Tabs Dark
 */
export const ContainerTabsDark = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "567890",
    variant: "dark",
    data: {
      items: [
        {   
          tab_text: "Tab label 1",
          title: "Section Heading (H3)",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 2",
          title: "Section Heading Item 2",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 3",
          title: "Section Heading Item 3",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 4",
          title: "Section Heading Item 4",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
          disabled: true,
        },
        {
          tab_text: "Tab label 5",
          title: "Section Heading Item 5",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 6",
          title: "Section Heading Item 6",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
      ],
    },
  },
};

/**
 * Tabs - Container Tabs Dark-Alt
 */
export const ContainerTabsDarkAlt = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "123456",
    variant: "dark-alt",
    data: {
      items: [
        {   
          tab_text: "Tab label 1",
          title: "Section Heading (H3)",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 2",
          title: "Section Heading Item 2",
          icon: "btn-icon fa-solid fa-arrow-up-right-from-square",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 3",
          title: "Section Heading Item 3",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 4",
          title: "Section Heading Item 4",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
          disabled: true,
        },
        {
          tab_text: "Tab label 5",
          title: "Section Heading Item 5",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
        {
          tab_text: "Tab label 6",
          title: "Section Heading Item 6",
          content: "<p>Lorem ipsum dolor sit amet consectetur. Viverra eu pulvinar a eu mauris ac at ultricies est. Tincidunt ultrices commodo vestibulum non netus. Mauris maecenas lacus hendrerit urna ultricies auctor. Sed tristique nascetur sapien condimentum adipiscing augue quisque eu. Facilisi ligula quam faucibus feugiat. Sapien at at eget malesuada senectus donec pellentesque pellentesque odio.</p>",
        },
      ],
    },
  },
};
