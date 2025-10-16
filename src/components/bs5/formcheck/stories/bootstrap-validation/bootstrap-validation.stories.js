// Bootstrap5Validation.stories.js
import { Formcheck } from "../../Formcheck.js";
import checkboxData from "../checkbox/checkbox.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Form Validation (Bootstrap 5)",
  render: (args) => {
    return `${new Formcheck(args).html}`;
  },
  parameters: {
    docs: {
      description: {
        component:
          "Bootstrap 5 validation states for form controls. Supports .is-valid/.is-invalid classes, :valid/:invalid pseudo-classes with .needs-validation/.was-validated parent classes, and validation feedback messages. Also maintains existing QLD Design System .valid/.invalid classes.",
      },
    },
  },
};

/**
 * Server side validation with isValid: true
 */
export const BootstrapIsValid = {
  name: "Bootstrap .is-valid",
  args: {
    ...checkboxData,
    isValid: true,
    questionLabel: "Bootstrap .is-valid validation",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "bootstrap-valid-1",
        label: "Valid checkbox option",
        isChecked: true,
      },
    ],
  },
};

/**
 * Server side validation
 */
export const BootstrapIsInvalid = {
  name: "Bootstrap .is-invalid",
  args: {
    ...checkboxData,
    isValid: false,
    questionLabel: "Bootstrap .is-invalid validation",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "bootstrap-invalid-1",
        label: "Invalid checkbox option",
        isChecked: false,
      },
    ],
  },
};

// HTML5 validation with .needs-validation
export const HTML5NeedsValidation = {
  name: "HTML5 .needs-validation",
  args: {
    ...checkboxData,
    questionLabel: "HTML5 validation with .needs-validation",
    hintLabel: "Click the button to trigger validation",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "needs-validation-1",
        label: "Required checkbox (unchecked will be invalid)",
        isChecked: false,
      },
    ],
  },
  render: (args) => {
    return `
      <form class="needs-validation" novalidate>
        <div class="mb-3">
          ${new Formcheck(args).html}
          <div class="invalid-feedback">
            You must agree before submitting.
          </div>
        </div>
        <button class="btn btn-primary" type="submit" onclick="validateForm(event)">Submit Form</button>
      </form>
      <script>
        function validateForm(event) {
          const form = event.target.closest('form');
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }
      </script>
    `;
  },
};

// Radio buttons with Bootstrap validation
export const BootstrapRadioValidation = {
  args: {
    ...checkboxData,
    questionLabel: "Bootstrap radio validation states",
    listitems: [
      {
        type: "radio",
        id: "radio-1",
        name: "radioGroup",
        label: "Radio Option 1",
        value: "1",
        isDisabled: false,
        isChecked: false,
      },
      {
        type: "radio",
        id: "radio-2",
        name: "radioGroup",
        label: "Radio Option 2",
        value: "2",
        isDisabled: false,
        isChecked: true,
      },
    ],
  },
  render: (args) => {
    return `
      <div class="mb-4">
        <h6>Valid Radio Group (.is-valid)</h6>
        <div class="is-valid">
          ${
            new Formcheck({
              ...args,
              listitems: [
                {
                  ...args.listitems[0],
                  id: "radio-valid-1",
                  isChecked: true,
                },
                {
                  ...args.listitems[1],
                  id: "radio-valid-2",
                  name: args.listitems[0].name,
                  isChecked: false,
                },
              ],
            }).html
          }
          <div class="valid-feedback">
            Great choice!
          </div>
        </div>
      </div>
      <div>
        <h6>Invalid Radio Group (.is-invalid)</h6>
        <div class="is-invalid">
          ${
            new Formcheck({
              ...args,
              listitems: [
                {
                  ...args.listitems[0],
                  id: "radio-invalid-1",
                  name: "invalidRadio",
                  isChecked: false,
                },
                {
                  ...args.listitems[1],
                  id: "radio-invalid-2",
                  name: "invalidRadio",
                  isChecked: false,
                },
              ],
            }).html
          }
          <div class="invalid-feedback">
            Please select a radio option.
          </div>
        </div>
      </div>
    `;
  },
};

// Dark mode validation
export const BootstrapValidationDark = {
  name: "Bootstrap Validation - Dark Mode",
  args: {
    ...checkboxData,
    questionLabel: "Bootstrap validation in dark mode",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "dark-valid-1",
        label: "Valid checkbox in dark mode",
        isChecked: true,
      },
      {
        ...checkboxData.listitems[1],
        id: "dark-invalid-1",
        label: "Invalid checkbox in dark mode",
        isChecked: false,
      },
    ],
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
    },
  },
  render: (args) => {
    return `
      <div class="dark p-4">
        <div class="mb-4">
          <h6 class="text-white">Valid State</h6>
          <div class="is-valid">
            ${
              new Formcheck({
                ...args,
                listitems: [args.listitems[0]],
              }).html
            }
            <div class="valid-feedback">
              Looks good in dark mode!
            </div>
          </div>
        </div>
        <div>
          <h6 class="text-white">Invalid State</h6>
          <div class="is-invalid">
            ${
              new Formcheck({
                ...args,
                listitems: [args.listitems[1]],
              }).html
            }
            <div class="invalid-feedback">
              Error message in dark mode.
            </div>
          </div>
        </div>
      </div>
    `;
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

// Comparison of validation methods
export const ValidationComparison = {
  name: "Validation Methods Comparison",
  args: {
    ...checkboxData,
    questionLabel: "Comparison of validation methods",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "compare-1",
        label: "Bootstrap .is-valid",
        isChecked: true,
      },
      {
        ...checkboxData.listitems[1],
        id: "compare-2",
        label: "Bootstrap .is-invalid",
        isChecked: false,
      },
      {
        ...checkboxData.listitems[2],
        id: "compare-3",
        label: "QLD .valid (legacy)",
        isChecked: true,
      },
      {
        ...checkboxData.listitems[3],
        id: "compare-4",
        label: "QLD .invalid (legacy)",
        isChecked: false,
      },
    ],
  },
  render: (args) => {
    return `
      <div class="mb-4">
        <h6>Bootstrap 5 Validation Classes</h6>
        <div class="is-valid mb-3">
          ${
            new Formcheck({
              ...args,
              listitems: [args.listitems[0]],
            }).html
          }
          <div class="valid-feedback">
            Bootstrap .is-valid with feedback
          </div>
        </div>
        <div class="is-invalid mb-3">
          ${
            new Formcheck({
              ...args,
              listitems: [args.listitems[1]],
            }).html
          }
          <div class="invalid-feedback">
            Bootstrap .is-invalid with feedback
          </div>
        </div>
      </div>
      <div>
        <h6>QLD Design System Legacy Classes</h6>
        <div class="valid mb-3">
          ${
            new Formcheck({
              ...args,
              listitems: [args.listitems[2]],
            }).html
          }
        </div>
        <div class="invalid mb-3">
          ${
            new Formcheck({
              ...args,
              listitems: [args.listitems[3]],
            }).html
          }
        </div>
      </div>
    `;
  },
};

// Small size validation
export const BootstrapValidationSmall = {
  name: "Bootstrap Validation - Small Size",
  args: {
    ...checkboxData,
    questionLabel: "Bootstrap validation with small size",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "small-valid-1",
        label: "Valid small checkbox",
        isChecked: true,
      },
      {
        ...checkboxData.listitems[1],
        id: "small-invalid-1",
        label: "Invalid small checkbox",
        isChecked: false,
      },
    ],
  },
  render: (args) => {
    return `
      <div class="small">
        <div class="mb-4">
          <h6>Valid State (Small)</h6>
          <div class="is-valid">
            ${
              new Formcheck({
                ...args,
                listitems: [args.listitems[0]],
              }).html
            }
            <div class="valid-feedback">
              Small valid checkbox
            </div>
          </div>
        </div>
        <div>
          <h6>Invalid State (Small)</h6>
          <div class="is-invalid">
            ${
              new Formcheck({
                ...args,
                listitems: [args.listitems[1]],
              }).html
            }
            <div class="invalid-feedback">
              Small invalid checkbox
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

// Interactive HTML5 validation example
export const InteractiveHTML5Validation = {
  name: "Interactive HTML5 Validation",
  args: {
    ...checkboxData,
    questionLabel: "Interactive HTML5 form validation",
    hintLabel:
      "Try submitting the form without checking the required checkboxes",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "interactive-1",
        label: "I agree to the terms and conditions (required)",
        isChecked: false,
      },
      {
        ...checkboxData.listitems[1],
        id: "interactive-2",
        label: "I want to receive marketing emails (optional)",
        isChecked: false,
      },
    ],
  },
  render: (args) => {
    return `
      <form class="needs-validation" novalidate>
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${args.listitems[0].id}" required>
            <label class="form-check-label" for="${args.listitems[0].id}">
              ${args.listitems[0].label}
            </label>
            <div class="invalid-feedback">
              You must agree to the terms and conditions.
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${args.listitems[1].id}">
            <label class="form-check-label" for="${args.listitems[1].id}">
              ${args.listitems[1].label}
            </label>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Submit Form</button>
        <button class="btn btn-secondary ms-2" type="button" onclick="resetForm(this)">Reset</button>
      </form>
      <script>
        // Add form validation
        (() => {
          'use strict';
          const forms = document.querySelectorAll('.needs-validation');
          Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        })();

        function resetForm(button) {
          const form = button.closest('form');
          form.classList.remove('was-validated');
          form.reset();
        }
      </script>
    `;
  },
};
