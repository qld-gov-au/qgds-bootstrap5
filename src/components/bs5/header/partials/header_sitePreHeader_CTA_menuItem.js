/**
 * @typedef {Object} DropdownOptionsConfig
 * @property {Array<{url: string, action?: string, label: string}>} groups - Array of dropdown groups with URLs and optional actions.
 * @property {boolean} [view_more] - Flag to indicate if 'view more' option should be rendered.
 * @property {string} [url] - URL for 'view more' link.
 * @property {string} [target] - Link target attribute for 'view more', usually '_blank' for new tab.
 * @property {string} [label] - Label for 'view more' link.
 * @property {string} [content] - HTML content for 'form' type dropdowns.
 */

/**
 * @typedef {Object} DropdownOptions
 * @property {string} dropdown_type - Type of dropdown to render, e.g. 'list' or 'form'.
 * @property {DropdownOptionsConfig} dropdown_config - Configuration object for the dropdown containing groups and view_more settings.
 */

/**
 * @typedef {Object} UrlObject
 * @property {string} value - The URL to be used in the href attribute.
 */

/**
 * @typedef {Object} TextObject
 * @property {string} value - The text to be displayed in the link.
 */

/**
 * @typedef {Object} RootIcons
 * @property {string} chevron_down - Icon identifier for the chevron down symbol.
 */

/**
 * @typedef {Object} sitePreHeader_CTA_menuItem
 * @property {boolean} dropdown_enabled - Flag indicating if the dropdown is enabled.
 * @property {string} id - Unique identifier for the dropdown.
 * @property {UrlObject} url - Object containing the URL for the link.
 * @property {TextObject} text - Object containing the text for the link.
 * @property {DropdownOptions} dropdown_options - The options object for configuring the dropdown.
 * @property {RootIcons} icons - Object containing identifiers for SVG icons.
 * @property {string} icon-root - The root path for the SVG icons.
 */

/**
 * The variables below need to be defined with appropriate values and passed to the Handlebars template header_sitePreHeader_CTA_menuItem.hbs.
 * @type {header_sitePreHeader_CTA_menuItem}
 */
