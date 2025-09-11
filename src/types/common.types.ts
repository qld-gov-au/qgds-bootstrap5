/**
 * Common types used across multiple components
 */

/** Basic icon configuration */
export interface IconConfig {
  /** CSS class for the icon */
  iconClass: string;
  /** Position relative to content */
  iconPosition?: "leading" | "trailing";
}

/** Common accessibility properties */
export interface AccessibilityProps {
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** ARIA described by reference */
  ariaDescribedBy?: string;
  /** Whether element is hidden from screen readers */
  ariaHidden?: boolean;
}

/** Common state properties */
export interface StateProps {
  /** Whether element is disabled */
  isDisabled?: boolean;
  /** Whether element is required */
  isRequired?: boolean;
  /** Whether element is in loading/progress state */
  isLoading?: boolean;
}

/** Common styling properties */
export interface StylingProps {
  /** Additional CSS classes */
  customClass?: string;
  /** Variant class for different styles */
  variantClass?: string;
}

/** Text content properties */
export interface TextContent {
  /** Main label text */
  label: string;
  /** Helper/hint text */
  hintText?: string;
  /** Placeholder text */
  placeholder?: string;
}

/** Validation message properties */
export interface ValidationMessages {
  /** Success message text */
  successMessageText?: string;
  /** Error message text */
  errorMessageText?: string;
  /** Warning message text */
  warningMessageText?: string;
}
