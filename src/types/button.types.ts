import {
  IconConfig,
  AccessibilityProps,
  StateProps,
  StylingProps,
  TextContent,
} from "./common.types.js";

/**
 * Button component data structure interface
 */
export interface ButtonData extends StylingProps, AccessibilityProps {
  /** CSS class for button variant (e.g., 'btn-primary', 'btn-secondary') */
  variantClass: string;

  /** Whether the button should render as a link */
  islink: boolean;

  /** Whether the button is disabled */
  isdisabled: boolean;

  /** Whether the button shows progress state */
  isprogress: boolean;

  /** Label text to show during progress state */
  progressLabel: string;

  /** CSS class for the icon (e.g., 'qld-icon-external-link') */
  iconClass: string;

  /** Position of the icon relative to text - either 'leading' or 'trailing' */
  iconPosition: "leading" | "trailing";

  /** Button text/label */
  label: string;

  /** URL for link buttons */
  href: string;

  /** Link target attribute (e.g., '_blank', '_self') */
  target: "_blank" | "_self" | "_parent" | "_top";
}
