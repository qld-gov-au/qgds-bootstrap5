import { Navbar } from "./Navbar.js";
import defaultdata from "./navbar.data.json";
import { breakpoints } from "../../../js/constants.js";

//Default story
export default {
  tags: ["autodocs"],
  title: "3. Components/Navbar",
  render: (args) => {
    // Create a copy of default data
    const data = JSON.parse(JSON.stringify(defaultdata));
    const addCount = args["Add Navigation Item"] || 0;
    const baseItemCount = defaultdata.navigation?.length || 0;

    // Rebuild navigation completely
    data.navigation = [];

    // Add base items
    for (let i = 0; i < baseItemCount; i++) {
      const originalItem = defaultdata.navigation[i];
      const itemName = originalItem.text;

      data.navigation.push({
        ...originalItem,
        text: args[`${itemName.replace(/\s+/g, "")}_text`] || originalItem.text,
        hideLabel:
          args[`${itemName.replace(/\s+/g, "")}_hideLabel`] !== undefined
            ? args[`${itemName.replace(/\s+/g, "")}_hideLabel`]
            : originalItem.hideLabel,
        mobileOnly:
          args[`${itemName.replace(/\s+/g, "")}_mobileOnly`] !== undefined
            ? args[`${itemName.replace(/\s+/g, "")}_mobileOnly`]
            : originalItem.mobileOnly,
        alternativeColor:
          args[`${itemName.replace(/\s+/g, "")}_alternativeColor`] !== undefined
            ? args[`${itemName.replace(/\s+/g, "")}_alternativeColor`]
            : originalItem.alternativeColor,
        iconName:
          args[`${itemName.replace(/\s+/g, "")}_iconName`] ||
          originalItem.iconName ||
          "",
      });
    }

    // Add new items
    for (let i = 0; i < addCount; i++) {
      const newItem = {
        text: args[`newItem${i}_text`] || `New Item ${i + 1}`,
        hideLabel: args[`newItem${i}_hideLabel`] || false,
        mobileOnly: args[`newItem${i}_mobileOnly`] || false,
        alternativeColor: args[`newItem${i}_alternativeColor`] || false,
        iconName: args[`newItem${i}_iconName`] || "",
        url: "#",
        cssClass: "",
        target_url: "#",
        dropdown_enabled: false,
      };

      data.navigation.push(newItem);
    }

    // Apply metadata
    data.metadata = data.metadata || {};
    data.metadata.alternativeColor = args["Nav alternativeColor"] || false;
    data.metadata.verticalOrientation =
      args["Nav verticalOrientation"] || false;
    data.metadata.navbarBrandName = args["Nav navbarBrandName"] || "";

    try {
      const navbarInstance = new Navbar(data);
      let html = navbarInstance.html;

      // Apply modifications with UNIQUE class names
      data.navigation.forEach((item) => {
        if (!item.text) return;

        const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        if (item.hideLabel) {
          html = html.replace(
            new RegExp(`(<a[^>]*>)(${escapedText})(</a>)`, "gi"),
            `$1<span class="sr-only">$2</span>$3`,
          );
        }

        if (item.mobileOnly) {
          // Use unique class names to avoid conflicts
          const textPos = html.indexOf(item.text);
          if (textPos !== -1) {
            let liStart = html.lastIndexOf("<li", textPos);
            if (liStart !== -1) {
              let liEnd = html.indexOf(">", liStart);
              if (liEnd !== -1) {
                const originalLiTag = html.substring(liStart, liEnd + 1);
                let newLiTag;

                if (originalLiTag.includes('class="')) {
                  // Add to existing class with unique names
                  newLiTag = originalLiTag.replace(
                    'class="',
                    'class="qgds-mobile-only qgds-hide-desktop ',
                  );
                } else {
                  // Add new class attribute with unique names
                  newLiTag = originalLiTag.replace(
                    "<li",
                    '<li class="qgds-mobile-only qgds-hide-desktop"',
                  );
                }

                html =
                  html.substring(0, liStart) +
                  newLiTag +
                  html.substring(liEnd + 1);
              }
            }
          }
        }

        if (item.alternativeColor) {
          const textPos = html.indexOf(item.text);
          if (textPos !== -1) {
            let liStart = html.lastIndexOf("<li", textPos);
            if (liStart !== -1) {
              let liEnd = html.indexOf(">", liStart);
              if (liEnd !== -1) {
                const originalLiTag = html.substring(liStart, liEnd + 1);
                let newLiTag;

                if (originalLiTag.includes('class="')) {
                  newLiTag = originalLiTag.replace(
                    'class="',
                    'class="qgds-alt-color ',
                  );
                } else {
                  newLiTag = originalLiTag.replace(
                    "<li",
                    '<li class="qgds-alt-color"',
                  );
                }

                html =
                  html.substring(0, liStart) +
                  newLiTag +
                  html.substring(liEnd + 1);
              }
            }
          }
        }
      });

      // Add CSS with UNIQUE class names and higher specificity
      const styles = `
        <style>
          .sr-only { 
            position: absolute !important; 
            width: 1px !important; 
            height: 1px !important; 
            padding: 0 !important; 
            margin: -1px !important; 
            overflow: hidden !important; 
            clip: rect(0, 0, 0, 0) !important; 
            white-space: nowrap !important; 
            border: 0 !important; 
          }
          
          /* Mobile-only items - hide on desktop with unique class names */
          @media (min-width: ${breakpoints.lg}px) { 
            .qgds-mobile-only,
            .qgds-hide-desktop,
            .navbar-nav .qgds-mobile-only,
            .navbar-nav .qgds-hide-desktop { 
              display: none !important; 
            } 
          }
          
          /* CSS for hiding/showing Storybook controls */
          .hide {
            display: none !important;
          }
        </style>
      `;

      return styles + html + `<!-- Render: ${Date.now()} -->`;
    } catch (error) {
      console.error("Error:", error);
      return `<div style="color: red; padding: 20px;"><h3>Error</h3><p>${error.message}</p></div>`;
    }
  },

  // Replace the entire argTypes section with this reordered version:

  argTypes: {
    // 1. Navbar Body (first)
    "Nav alternativeColor": {
      control: "boolean",
      table: { category: "Navbar Body" },
    },
    "Nav verticalOrientation": {
      control: "boolean",
      table: { category: "Navbar Body" },
    },
    "Nav navbarBrandName": {
      control: "text",
      table: { category: "Navbar Body" },
    },

    // 2. Base Items (second) - move this BEFORE Navigation
    ...(() => {
      const argTypes = {};
      if (defaultdata.navigation) {
        defaultdata.navigation.forEach((item) => {
          const baseName = item.text.replace(/\s+/g, "");
          argTypes[`${baseName}_iconName`] = {
            name: `${item.text} - Icon Name`,
            control: "text",
            table: { category: "Base Items" },
          };
          argTypes[`${baseName}_text`] = {
            name: `${item.text} - Text`,
            control: "text",
            table: { category: "Base Items" },
          };
          argTypes[`${baseName}_hideLabel`] = {
            name: `${item.text} - Hide Label`,
            control: "boolean",
            table: { category: "Base Items" },
          };
          argTypes[`${baseName}_mobileOnly`] = {
            name: `${item.text} - Mobile Only`,
            control: "boolean",
            table: { category: "Base Items" },
          };
          argTypes[`${baseName}_alternativeColor`] = {
            name: `${item.text} - Alternative Color`,
            control: "boolean",
            table: { category: "Base Items" },
          };
        });
      }
      return argTypes;
    })(),

    // 3. Navigation (third) - move this AFTER Base Items
    "Add Navigation Item": {
      control: { type: "range", min: 0, max: 3, step: 1 },
      table: { category: "Navigation" },
    },

    // 4. New Items (fourth) - keep this last
    ...(() => {
      const argTypes = {};
      for (let i = 0; i < 3; i++) {
        const itemNumber = i + 1;

        argTypes[`newItem${i}_iconName`] = {
          name: `New Item ${itemNumber} - Icon Name`,
          control: "text",
          table: {
            category: "New Items",
            className: (args) =>
              args && args["Add Navigation Item"] >= itemNumber ? "" : "hide",
          },
        };
        argTypes[`newItem${i}_text`] = {
          name: `New Item ${itemNumber} - Text`,
          control: "text",
          table: {
            category: "New Items",
            className: (args) =>
              args && args["Add Navigation Item"] >= itemNumber ? "" : "hide",
          },
        };
        argTypes[`newItem${i}_hideLabel`] = {
          name: `New Item ${itemNumber} - Hide Label`,
          control: "boolean",
          table: {
            category: "New Items",
            className: (args) =>
              args && args["Add Navigation Item"] >= itemNumber ? "" : "hide",
          },
        };
        argTypes[`newItem${i}_mobileOnly`] = {
          name: `New Item ${itemNumber} - Mobile Only`,
          control: "boolean",
          table: {
            category: "New Items",
            className: (args) =>
              args && args["Add Navigation Item"] >= itemNumber ? "" : "hide",
          },
        };
        argTypes[`newItem${i}_alternativeColor`] = {
          name: `New Item ${itemNumber} - Alternative Color`,
          control: "boolean",
          table: {
            category: "New Items",
            className: (args) =>
              args && args["Add Navigation Item"] >= itemNumber ? "" : "hide",
          },
        };
      }
      return argTypes;
    })(),
  },

  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97604&p=f&t=LpEqEay1h4fgTRLl-0",
    },
  },
};

export const Default = {
  parameters: {
    docs: {
      story: { height: "80vh" },
    },
  },
  args: {
    "Nav alternativeColor": false,
    "Nav verticalOrientation": false,
    "Nav navbarBrandName": "Menu",
    "Add Navigation Item": 0,
    // Initialize base items with iconName
    ...(() => {
      const args = {};
      if (defaultdata.navigation) {
        defaultdata.navigation.forEach((item) => {
          const baseName = item.text.replace(/\s+/g, "");
          args[`${baseName}_iconName`] = item.iconName || "";
          args[`${baseName}_text`] = item.text;
          args[`${baseName}_hideLabel`] = item.hideLabel || false;
          args[`${baseName}_mobileOnly`] = item.mobileOnly || false;
          args[`${baseName}_alternativeColor`] = item.alternativeColor || false;
        });
      }

      // Initialize new items with iconName
      for (let i = 0; i < 3; i++) {
        args[`newItem${i}_iconName`] = "";
        args[`newItem${i}_text`] = `New Item ${i + 1}`;
        args[`newItem${i}_hideLabel`] = false;
        args[`newItem${i}_mobileOnly`] = false;
        args[`newItem${i}_alternativeColor`] = false;
      }

      return args;
    })(),
  },

  // Add custom render function for this story only
  render: (args) => {
    // Create a copy of default data
    const data = JSON.parse(JSON.stringify(defaultdata));
    const addCount = args["Add Navigation Item"] || 0;
    const baseItemCount = defaultdata.navigation?.length || 0;

    // Rebuild navigation completely
    data.navigation = [];

    // Add base items
    for (let i = 0; i < baseItemCount; i++) {
      const originalItem = defaultdata.navigation[i];
      const itemName = originalItem.text;

      data.navigation.push({
        ...originalItem,
        text: args[`${itemName.replace(/\s+/g, "")}_text`] || originalItem.text,
        hideLabel:
          args[`${itemName.replace(/\s+/g, "")}_hideLabel`] !== undefined
            ? args[`${itemName.replace(/\s+/g, "")}_hideLabel`]
            : originalItem.hideLabel,
        mobileOnly:
          args[`${itemName.replace(/\s+/g, "")}_mobileOnly`] !== undefined
            ? args[`${itemName.replace(/\s+/g, "")}_mobileOnly`]
            : originalItem.mobileOnly,
        alternativeColor:
          args[`${itemName.replace(/\s+/g, "")}_alternativeColor`] !== undefined
            ? args[`${itemName.replace(/\s+/g, "")}_alternativeColor`]
            : originalItem.alternativeColor,
        iconName:
          args[`${itemName.replace(/\s+/g, "")}_iconName`] ||
          originalItem.iconName ||
          "",
      });
    }

    // Add new items
    for (let i = 0; i < addCount; i++) {
      const newItem = {
        text: args[`newItem${i}_text`] || `New Item ${i + 1}`,
        hideLabel: args[`newItem${i}_hideLabel`] || false,
        mobileOnly: args[`newItem${i}_mobileOnly`] || false,
        alternativeColor: args[`newItem${i}_alternativeColor`] || false,
        iconName: args[`newItem${i}_iconName`] || "",
        url: "#",
        cssClass: "",
        target_url: "#",
        dropdown_enabled: false,
      };

      data.navigation.push(newItem);
    }

    // Apply metadata
    data.metadata = data.metadata || {};
    data.metadata.alternativeColor = args["Nav alternativeColor"] || false;
    data.metadata.verticalOrientation =
      args["Nav verticalOrientation"] || false;
    data.metadata.navbarBrandName = args["Nav navbarBrandName"] || "";

    try {
      const navbarInstance = new Navbar(data);
      let html = navbarInstance.html;

      // Apply modifications with UNIQUE class names
      data.navigation.forEach((item) => {
        if (!item.text) return;

        const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        if (item.hideLabel) {
          html = html.replace(
            new RegExp(`(<a[^>]*>)(${escapedText})(</a>)`, "gi"),
            `$1<span class="sr-only">$2</span>$3`,
          );
        }

        if (item.mobileOnly) {
          const textPos = html.indexOf(item.text);
          if (textPos !== -1) {
            let liStart = html.lastIndexOf("<li", textPos);
            if (liStart !== -1) {
              let liEnd = html.indexOf(">", liStart);
              if (liEnd !== -1) {
                const originalLiTag = html.substring(liStart, liEnd + 1);
                let newLiTag;

                if (originalLiTag.includes('class="')) {
                  newLiTag = originalLiTag.replace(
                    'class="',
                    'class="qgds-mobile-only qgds-hide-desktop ',
                  );
                } else {
                  newLiTag = originalLiTag.replace(
                    "<li",
                    '<li class="qgds-mobile-only qgds-hide-desktop"',
                  );
                }

                html =
                  html.substring(0, liStart) +
                  newLiTag +
                  html.substring(liEnd + 1);
              }
            }
          }
        }

        if (item.alternativeColor) {
          const textPos = html.indexOf(item.text);
          if (textPos !== -1) {
            let liStart = html.lastIndexOf("<li", textPos);
            if (liStart !== -1) {
              let liEnd = html.indexOf(">", liStart);
              if (liEnd !== -1) {
                const originalLiTag = html.substring(liStart, liEnd + 1);
                let newLiTag;

                if (originalLiTag.includes('class="')) {
                  newLiTag = originalLiTag.replace(
                    'class="',
                    'class="qgds-alt-color ',
                  );
                } else {
                  newLiTag = originalLiTag.replace(
                    "<li",
                    '<li class="qgds-alt-color"',
                  );
                }

                html =
                  html.substring(0, liStart) +
                  newLiTag +
                  html.substring(liEnd + 1);
              }
            }
          }
        }
      });

      // Add CSS with UNIQUE class names and higher specificity
      const styles = `
        <style>
        .css-sx1422 { height: auto !important; }
        .sb-show-main.sb-main-padded { padding: 0 !important; }
        #storybook-only-header {
          position: relative;
          z-index: 11;
          background: #f8f9fa;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        @media (width <= ${breakpoints.lg}px) {
          
          #burgerBtn {
            --nav-header-icon-color: #ffe500;
            display: flex !important;
            flex-direction: column;
            gap:0;
            .qld-icon {
              background-color: var(--nav-header-icon-color);
            }
          }
          .navbar.show #overlay {
            position: absolute;
          }
          #story--3-components-navbar--default--primary-inner:has(.show) {
            #storybook-only-header {
              display:none;
            }
          }
          #storybook-root:has(.show) {
            #storybook-only-header {
              display:none;
            }
          }
          .navbar #burgerCloseBtn::before {
            --nav-header-icon-color: var(--#{$prefix}brand-accent);
            background-color: var(--nav-header-icon-color, #ffe500);
          }
        }
        @media (width >= ${breakpoints.lg}px) {
          #burgerBtn, #storybook-only-header {
            display: none !important;
          }
        }
        </style>
      `;

      const navbarHTML = styles + html + `<!-- Render: ${Date.now()} -->`;

      // HTML that appears before the navbar (Storybook only)
      const beforeHTML = `
        <div id="storybook-only-header">
          <button id="burgerBtn" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-expanded="false" aria-controls="collapseExample">
            <span class="qld-icon qld-icon-xl qld-icon-menu"></span>
            menu
          </button>
        </div>
      `;

      return beforeHTML + navbarHTML;
    } catch (error) {
      console.error("Error:", error);
      return `<div style="color: red; padding: 20px;"><h3>Error</h3><p>${error.message}</p></div>`;
    }
  },
};
