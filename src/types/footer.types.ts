import { AccessibilityProps, StylingProps } from "./common.types.js";

/**
 * Footer component data structure interfaces
 */

/** Contact list item within footer contact section */
export interface FooterContactListItem {
  /** Icon CSS class (e.g., 'qld-icon-phone', 'qld-icon-email') */
  icon: string;
  /** HTML content for the contact item */
  label: string;
}

/** Collection of contact list items */
export interface FooterContactList {
  /** Phone contact item */
  phone?: FooterContactListItem;
  /** Email contact item */
  email?: FooterContactListItem;
  /** Additional contact items */
  [key: string]: FooterContactListItem | undefined;
}

/** Footer contact section configuration */
export interface FooterContact {
  /** Whether to show border column styling */
  hasBorderColumn: boolean | string;
  /** Section title */
  title: string;
  /** HTML content for the section */
  content: string;
  /** Whether to show the contact list */
  showList: boolean;
  /** Contact list items */
  list?: FooterContactList;
  /** Call-to-action button label */
  buttonLabel?: string;
  /** Call-to-action button URL */
  buttonLink?: string;
}

/** Footer link item */
export interface FooterLinkItem {
  /** Link display text */
  label: string;
  /** Link URL */
  link: string;
  /** Link target (optional) */
  target?: "_blank" | "_self" | "_parent" | "_top";
}

/** Footer links section configuration */
export interface FooterLinks {
  /** Whether to show border column styling */
  hasBorderColumn: boolean;
  /** Section title */
  title: string;
  /** Array of footer links */
  list: FooterLinkItem[];
}

/** Footer acknowledgement section */
export interface FooterAcknowledgement {
  /** Acknowledgement title */
  title: string;
  /** HTML content for acknowledgement */
  content: string;
}

/** Footer logo configuration */
export interface FooterLogo {
  /** Whether to display the logo */
  show: boolean;
  /** Logo image source URL */
  src: string;
  /** Logo alt text for accessibility */
  alt: string;
}

/** Footer copyright configuration */
export interface FooterCopyright {
  /** Copyright text content */
  content: string;
  /** Whether to show "from year" */
  showYearFrom: boolean;
  /** Starting year for copyright */
  yearFrom: string;
}

/** Footer organisation link configuration */
export interface FooterOrganisationLink {
  /** Whether to display the organisation link */
  show: boolean;
  /** Organisation website URL */
  URL: string;
  /** Organisation display text */
  text: string;
}

/** Social media follow link */
export interface FooterFollowLink {
  /** Social platform name */
  label: string;
  /** Social platform URL */
  link: string;
  /** Icon identifier (e.g., 'facebook', 'linkedin') */
  icon: string;
  /** Link target (optional) */
  target?: "_blank" | "_self" | "_parent" | "_top";
}

/** Custom footer link */
export interface FooterCustomLink {
  /** Link display text */
  label: string;
  /** Link URL */
  link: string;
  /** Link target (optional) */
  target?: "_blank" | "_self" | "_parent" | "_top";
}

/** Optional footer column configuration */
export interface FooterOptionalColumn {
  /** Whether to show border column styling */
  hasBorderColumn: boolean;
  /** Column title */
  title: string;
  /** HTML content for the column */
  content: string;
  /** Whether to display follow/social links */
  showFollowLinks: boolean;
  /** Whether to display custom links */
  showCustomLinks: boolean;
}

/**
 * Main footer component data structure interface
 */
export interface FooterData extends StylingProps, AccessibilityProps {
  /** Site name or identifier */
  sitename?: string;
  /** CSS variant class for footer styling */
  variantClass?: string;
  /** Contact section configuration */
  contact: FooterContact;
  /** Footer links section */
  footerLinks: FooterLinks;
  /** Acknowledgement sections */
  acknowledgements: FooterAcknowledgement[];
  /** Footer logo configuration */
  footerLogo: FooterLogo;
  /** Copyright information */
  copyright: FooterCopyright;
  /** Organisation link configuration */
  organisationLink: FooterOrganisationLink;
  /** Social media follow links */
  followLinks: FooterFollowLink[];
  /** Custom footer links */
  customLinks: FooterCustomLink[];
  /** Optional column 1 configuration */
  optionalColumn1: FooterOptionalColumn;
  /** Optional column 2 configuration */
  optionalColumn2: FooterOptionalColumn;
}

/**
 * Type guards for footer interfaces
 */

/** Type guard for FooterContact */
export function isFooterContact(value: unknown): value is FooterContact {
  if (!value || typeof value !== "object") return false;
  const contact = value as any;
  return (
    typeof contact.title === "string" &&
    typeof contact.content === "string" &&
    typeof contact.showList === "boolean"
  );
}

/** Type guard for FooterData */
export function isFooterData(value: unknown): value is FooterData {
  if (!value || typeof value !== "object") return false;
  const data = value as any;
  return (
    isFooterContact(data.contact) &&
    Array.isArray(data.acknowledgements) &&
    Array.isArray(data.followLinks) &&
    Array.isArray(data.customLinks)
  );
}
