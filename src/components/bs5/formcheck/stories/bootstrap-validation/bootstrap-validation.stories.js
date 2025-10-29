// Bootstrap5Validation.stories.js
import { Formcheck, argTypes } from "../../Formcheck.js";
import checkboxData from "../checkbox/checkbox.data.json";

const defaultData = { ...checkboxData, optionalLabel: null };

/**
 * This page tests and compares various validation styling methods.
 *
 * Server side validation:
 * - via Bootstrap's `.is-valid`/`.is-invalid` classes.
 * - also via legacy `.valid` and `.invalid` classes on the form element.
 *
 * Client side validation:
 * - via `.was-validated` class on the `<form>` element targeting html5 `:valid` and `:invalid` input element pseudoclasses.
 */
export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Form Validation",
  render: (args) => {
    return `${new Formcheck(args).html}`;
  },
  args: defaultData,
  argTypes,
  parameters: {
    controls: {
      include: ["isValid", "successMessageText", "errorMessageText", "type"],
    },

    backgrounds: { disable: false },
  },
};

/**
 * Server side validation with `isValid: false`
 */
export const BootstrapIsInvalid = {
  name: "Server side - invalid",
  args: {
    ...defaultData,
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

/**
 * Server side validation with `isValid: true`
 */
export const BootstrapIsValid = {
  name: "Server side - valid",
  args: {
    ...defaultData,
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
 * Client side validation offers the best user experience, however it not always suit your needs.
 * For client side validation using HTML5 features, add the `novalidate` boolean attribute to your `<form>`.
 * This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript.
 * Try to submit the form below; our JavaScript will intercept the submit button and relay feedback to you.
 * Validation styles using built-in HTML5 validation require class `was-validated` to be added to the `<form>` and rely on the `:invalid` and `:valid` pseudoclasses.
 */
export const HTML5NeedsValidation = {
  name: "Client side validation",
  args: {
    ...defaultData,
    questionLabel: "HTML5 validation with .needs-validation",
    hintLabel: "Click the button to trigger validation",
    listitems: [
      {
        ...defaultData.listitems[0],
        id: "needs-validation-1",
        label: "Required checkbox (unchecked will be invalid)",
        isChecked: false,
        isRequired: true,
      },
      {
        ...defaultData.listitems[1],
        id: "needs-validation-2",
        label: "Required checkbox (checked will be valid)",
        isChecked: true,
        isRequired: true,
      },
    ],
  },
  render: (args) => {
    return `
      <form class="needs-validation" novalidate>
        <div class="row">
          <div class="col">${new Formcheck({ ...args, listitems: [args.listitems[0]] }).html}</div>
          <div class="col">${new Formcheck({ ...args, listitems: [args.listitems[1]] }).html}</div>
        </div>
          
        <button class="btn btn-primary mt-3" type="submit" onclick="validateForm(event)">Validate</button>
      </form>
      <script>
        function validateForm(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.target.closest('form');
        const check1 = form.elements["needs-validation-1"];
        const check2 = form.elements["needs-validation-2"];
        check1.checked = false;
        check2.checked = true;
        form.classList.add('was-validated');
        }
      </script>
    `;
  },
};

// Radio buttons with Bootstrap validation
export const BootstrapRadioValidation = {
  args: {
    ...defaultData,
    type: "radio",
    questionLabel: "Radio inputs",
    listitems: [
      {
        type: "radio",
        id: "radio-1",
        name: "radioGroup",
        label: "Radio Option 1",
        value: "1",
        isDisabled: false,
        isChecked: true,
      },
      {
        type: "radio",
        id: "radio-2",
        name: "radioGroup",
        label: "Radio Option 2",
        value: "2",
        isDisabled: false,
        isChecked: false,
      },
    ],
  },
  render: (args) => {
    return `
    <div class="row">
      <div class="col">
      ${
        new Formcheck({
          ...args,
          isValid: true,
          questionLabel: "Valid radio inputs",
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
      }</div>
      <div class="col">
      
      ${
        new Formcheck({
          ...args,
          isValid: false,
          questionLabel: "Invalid radio inputs",
          listitems: [
            {
              ...args.listitems[0],
              id: "radio-invalid-1",
              name: "invalidRadio",
              isChecked: true,
            },
            {
              ...args.listitems[1],
              id: "radio-invalid-2",
              name: "invalidRadio",
              isChecked: false,
            },
          ],
        }).html
      }</div>
    </div>
    `;
  },
};

export const BootstrapValidationDark = {
  name: "Dark Palette",
  args: {
    ...defaultData,
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
  globals: { backgrounds: { value: "dark" } },
  render: (args) => {
    return `
      <div class="dark row">
        <div class="col">${
          new Formcheck({
            ...args,
            isValid: true,
            listitems: [args.listitems[0]],
          }).html
        }</div>
        <div class="col">${
          new Formcheck({
            ...args,
            isValid: false,
            listitems: [args.listitems[1]],
          }).html
        }</div>
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

/**
 * `.valid` and `.invalid` classes on the form or parent element.
 */
export const ValidationComparison = {
  name: "Legacy Validation Comparison",
  args: {
    ...defaultData,
    questionLabel: "Comparison of validation methods",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "compare-1",
        label: "Legacy .valid",
        isChecked: true,
      },
      {
        ...checkboxData.listitems[1],
        id: "compare-2",
        label: "Legacy .invalid",
        isChecked: false,
      },
      {
        ...checkboxData.listitems[2],
        id: "compare-3",
        label: "Bootstrap .is-valid",
        isChecked: true,
      },
      {
        ...checkboxData.listitems[3],
        id: "compare-4",
        label: "Bootstrap .is-invalid",
        isChecked: false,
      },
    ],
  },
  render: (args) => {
    return `
      <div class="row">
        <div class="col">
          <div class="valid">
            ${
              new Formcheck({
                ...args,
                questionLabel: "Legacy classes - .valid",
                listitems: [args.listitems[0]],
              }).html
            }
          </div>
          <div class="invalid">
            ${
              new Formcheck({
                ...args,
                questionLabel: "Legacy classes - .invalid",
                listitems: [args.listitems[1]],
              }).html
            }
        </div>
      </div>
      <div class="col">
        <div>
          ${
            new Formcheck({
              ...args,
              questionLabel: "Bootstrap classes - .is-valid",
              isValid: true,
              listitems: [args.listitems[2]],
            }).html
          }
        </div>
        <div>
          ${
            new Formcheck({
              ...args,
              questionLabel: "Bootstrap classes .is-invalid",
              isValid: false,
              listitems: [args.listitems[3]],
            }).html
          }
        </div>
      </div>
    </div>
    `;
  },
};
