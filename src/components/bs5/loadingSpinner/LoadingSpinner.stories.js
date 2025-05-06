// ComponentExample.stories.js
import { LoadingSpinner } from "./LoadingSpinner.js";
import defaultdata from "./loadingSpinner.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Loading Spinner",
  render: (args) => {
    return new LoadingSpinner(args).html;
  },
  decorators: [
    (Story) => {
      return `
      <div class="">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Default Loading Spinner
 */
export const Default = { args: defaultdata };

/**
 * Dark themed Loading Spinner
 */
export const Dark = {
  args: defaultdata,
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
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

/**
 * Minimal Loading Spinner
 */
export const Minimal = { args: { ...defaultdata, ...{ minimal: true } } };

/**
 * Stacked Loading Spinner
 */
export const Stacked = { args: { ...defaultdata, ...{ stacked: true } } };
