// create-metadata-files.js
import fs from "fs";
import path from "path";

// Component data from component-metadata-summary.json
const componentData = [
  {
    BS5Component: "accordion/",
    ID: "qgds-accordion",
    title: "Accordion",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Accordion",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-98109&p=f&t=GROIooMNoyn7sZDF-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "backToTop/",
    ID: "qgds-back-to-top",
    title: "Back to top",
    type: "Pattern",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Back to top",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=120353-3948&t=beW2nmeyEGkeoezl-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/back-to-top",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "banner/",
    ID: "qgds-banner",
    title: "Banners (Default)",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Banners",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=6992-107232&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/banners",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "blockquote/",
    ID: "qgds-blockquote",
    title: "Block quote",
    type: "Component",
    scope: "Core",
    group: "Callouts",
    status: "Published",
    synonyms: "",
    name_uikit: "Callout and Blockquote",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=120360-73541&t=yBoHyNGNM1kMkPfC-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/callouts",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "breadcrumbs/",
    ID: "qgds-breadcrumbs",
    title: "Breadcrumbs",
    type: "Component",
    scope: "Core",
    group: "Navigation",
    status: "Published",
    synonyms: "",
    name_uikit: "Breadcrumbs",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-98076&p=f&t=GROIooMNoyn7sZDF-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/breadcrumbs",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "button/",
    ID: "qgds-button",
    title: "Buttons",
    type: "Component",
    scope: "Core",
    group: "Forms",
    status: "Published",
    synonyms: "",
    name_uikit: "Buttons",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-98058&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/buttons",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "callToAction/",
    ID: "qgds-button-cta",
    title: "Call to action",
    type: "Component",
    scope: "Core",
    group: "Navigation",
    status: "Published",
    synonyms: "",
    name_uikit: "Call-to-action",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=120360-77029&t=72ZKZxpVAzz6DIVf-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/call-to-action-cta",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "callout/",
    ID: "qgds-callout",
    title: "Callout",
    type: "Component",
    scope: "Core",
    group: "Alerts",
    status: "Published",
    synonyms: "",
    name_uikit: "Callout and Blockquote",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-98115&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/callouts",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "card/",
    ID: "qgds-card",
    title: "Cards",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Cards",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=10811-221416&t=1PNeXYXdepnDeW4g-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "directionLinks/",
    ID: "qgds-direction-link",
    title: "Direction link",
    type: "Component",
    scope: "Core",
    group: "Navigation",
    status: "Published",
    synonyms: "",
    name_uikit: "Direction links",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321363&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/direction-links",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "footer/",
    ID: "qgds-footer",
    title: "Footer",
    type: "Pattern",
    scope: "Core",
    group: "Layout",
    status: "Published",
    synonyms: "",
    name_uikit: "Footer",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97582&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/footer",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "globalAlert/",
    ID: "qgds-alert-global",
    title: "Global alert",
    type: "Component",
    scope: "Core",
    group: "Callouts",
    status: "Published",
    synonyms: "",
    name_uikit: "Alerts (global)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97590&p=f&t=GROIooMNoyn7sZDF-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/alerts-global",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "header/",
    ID: "qgds-header",
    title: "Header",
    type: "Pattern",
    scope: "Core",
    group: "Layout",
    status: "Published",
    synonyms: "",
    name_uikit: "Header",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97586&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/header",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "icons/",
    ID: "qgds-icons",
    title: "Icons",
    type: "Pattern",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Icons",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=78442-34904&t=1hdwEIoZGw3tawaE-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "image/",
    ID: "qgds-image",
    title: "Image",
    type: "Pattern",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Imagery",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=23805-301812&t=1hdwEIoZGw3tawaE-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "inpageAlert/",
    ID: "qgds-alert-inpage",
    title: "In-page alert",
    type: "Component",
    scope: "Core",
    group: "Alerts",
    status: "Published",
    synonyms: "",
    name_uikit: "Alert (in-page)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-98125&p=f&t=GROIooMNoyn7sZDF-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "linkColumns/",
    ID: "qgds-link-columns",
    title: "Link columns",
    type: "Component",
    scope: "Core",
    group: "Navigation",
    status: "Published",
    synonyms: "",
    name_uikit: "Link columns",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321574&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/link-columns-link-list",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "spinner/",
    ID: "qgds-loading-spinner",
    title: "Loading spinner",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Loading spinner",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=49314-16705&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/loading-spinner",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "navbar/",
    ID: "qgds-horizontal-navigation",
    title: "Navigation (horizontal)",
    type: "Component",
    scope: "Core",
    group: "Navigation",
    status: "Published",
    synonyms: "",
    name_uikit: "Navigation (horizontal)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97604&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "inpagenav/",
    ID: "qgds-inpage-navigation",
    title: "Page navigation",
    type: "Component",
    scope: "Core",
    group: "Navigation",
    status: "Published",
    synonyms: "",
    name_uikit: "In-page navigation",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=7905-252906&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/pagination",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "pagination/",
    ID: "qgds-pagination",
    title: "Pagination",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Pagination",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321779&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/promotional-panel",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "promotionalPanel/",
    ID: "qgds-promotional-panel",
    title: "Promotional panel",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Promo panels",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=23269-286312&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "quickexit/",
    ID: "qgds-quickexit",
    title: "Quick exit",
    type: "Pattern",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Quick exit",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321318&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/radio-buttons",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "searchInput/",
    ID: "qgds-search-field",
    title: "Search input",
    type: "Component",
    scope: "Core",
    group: "Forms",
    status: "Published",
    synonyms: "",
    name_uikit: "Input field (Search-box)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97871&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/input-fields-select-box",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "select/",
    ID: "qgds-select-box",
    title: "Select input",
    type: "Component",
    scope: "Core",
    group: "Forms",
    status: "Published",
    synonyms: "",
    name_uikit: "Input field (Select/Dropdown)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321345&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/side-navigation",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "sidenav/",
    ID: "qgds-side-navigation",
    title: "Side navigation",
    type: "Component",
    scope: "Core",
    group: "Navigation",
    status: "Published",
    synonyms: "",
    name_uikit: "Navigation (Side Navigation)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321787&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/tables",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "table/",
    ID: "qgds-table",
    title: "Table",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Tables",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97592&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/tabs",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "tabs/",
    ID: "qgds-tab",
    title: "Tabs",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Tabs",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=25951-236134&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "https://www.designsystem.qld.gov.au/components/tags",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "tag/",
    ID: "qgds-tag",
    title: "Tags",
    type: "Component",
    scope: "Core",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Tags",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5702-89540&t=loDOHfqaVy8bH9Qa-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/input-fields-text-box-and-area",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "textarea/",
    ID: "qgds-textarea",
    title: "Text area",
    type: "Component",
    scope: "Core",
    group: "Forms",
    status: "Published",
    synonyms: "",
    name_uikit: "Input fields (Text-box and Text-area)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97997&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website:
      "https://www.designsystem.qld.gov.au/components/input-fields-text-box-and-area",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "textbox/",
    ID: "qgds-textinput",
    title: "Text input",
    type: "Component",
    scope: "Core",
    group: "Forms",
    status: "Published",
    synonyms: "",
    name_uikit: "Input fields (Text-box and Text-area)",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97997&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "link/",
    ID: "qgds-icon-links",
    title: "Icon Links",
    type: "Component",
    scope: "Extended",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Icon links",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=12900-201779&p=f&t=lX0AsFvCDF1u9JbC-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
  {
    BS5Component: "video/",
    ID: "qgds-video",
    title: "Video player",
    type: "Component",
    scope: "Extended",
    group: "",
    status: "Published",
    synonyms: "",
    name_uikit: "Video player",
    refs_uikit:
      "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=13297-214065&p=f&t=1PNeXYXdepnDeW4g-0",
    refs_website: "",
    refs_bs5_storybook: "",
  },
];

function createMetadataFiles() {
  const results = {
    created: [],
    errors: [],
    skipped: [],
  };

  componentData.forEach((component) => {
    // Skip if BS5Component is empty or invalid
    if (!component.BS5Component || !component.BS5Component.trim()) {
      results.skipped.push(
        `Skipped component with empty BS5Component: ${component.title || "Unknown"}`,
      );
      return;
    }

    try {
      // Handle synonyms - split by comma if present, otherwise empty array
      const synonyms =
        component.synonyms && component.synonyms.trim()
          ? component.synonyms.split(",").map((s) => s.trim())
          : [];

      // Create metadata object
      const metadata = {
        id: component.ID || "",
        title: component.title || "",
        title_uikit: component.name_uikit || "",
        type: component.type || "",
        scope: component.scope || "",
        group: component.group || "",
        status: component.status || "",
        synonyms: synonyms,
        description: "",
        refs: {
          uikit: component.refs_uikit || "",
          website: component.refs_website || "",
          storybook: component.refs_bs5_storybook || "",
        },
      };

      // Construct file path
      const basePath = process.cwd();
      const componentDir = path.join(
        basePath,
        "src",
        "components",
        "bs5",
        component.BS5Component,
      );
      const metadataPath = path.join(componentDir, "metadata.json");

      // Check if directory exists
      if (!fs.existsSync(componentDir)) {
        results.errors.push(`Directory does not exist: ${componentDir}`);
        return;
      }

      // Write metadata file
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf8");
      results.created.push(metadataPath);
    } catch (error) {
      results.errors.push(
        `Error creating metadata for ${component.title}: ${error.message}`,
      );
    }
  });

  return results;
}

// Run the function
console.log("Creating metadata files...\n");
const results = createMetadataFiles();

console.log("=== METADATA FILE CREATION RESULTS ===");
console.log(`\nSuccessfully created: ${results.created.length} files`);
results.created.forEach((file) => console.log(`  ✓ ${file}`));

if (results.errors.length > 0) {
  console.log(`\nErrors: ${results.errors.length}`);
  results.errors.forEach((error) => console.log(`  ✗ ${error}`));
}

if (results.skipped.length > 0) {
  console.log(`\nSkipped: ${results.skipped.length}`);
  results.skipped.forEach((skip) => console.log(`  - ${skip}`));
}

console.log("\nDone!");
