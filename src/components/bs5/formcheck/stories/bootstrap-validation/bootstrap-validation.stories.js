// Bootstrap5Validation.stories.js
import { Formcheck, argTypes } from "../../Formcheck.js";
import { Textarea } from "../../../textarea/Textarea.js";
import { Textbox } from "../../../textbox/Textbox.js";
import { Select } from "../../../select/Select.js";
import { Dateinput } from "../../../dateinput/Dateinput.js";
import checkboxData from "../checkbox/checkbox.data.json";
import textAreaData from "../../../textarea/textarea.data.json";
import textInputData from "../../../textbox/textbox.data.json";
import dateInputData from "../../../dateinput/dateinput.data.json";
import selectData from "../../../select/select.data.json";

checkboxData.optionalLabel = null;
textAreaData.optionalLabel = null;
textInputData.optionalLabel = null;
selectData.optionalLabel = null;
dateInputData.optionalLabel = null;

/**
 * This page tests and compares various validation styling methods.
 *
 * Server side validation:
 * - via Bootstrap's `.is-valid`/`.is-invalid` classes.
 * - also via legacy `.valid` and `.invalid` classes on the form element.
 *
 * Client side validation:
 * - via `.was-validated` class on the `<form>` element targeting html5 `:valid` and `:invalid` input element pseudoclasses.
 *
 * #### Multiple input forms and validation feedback
 * Because validation feedback (error or success messages) styles rely on sibling input selectors,
 * it is important to wrap individual form components in a containing div when also providing validation feedback.
 */
export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Form Validation",
  args: {
    ...checkboxData, // There is no shared form element abstract args, only use controls common to all inputs (isValid, successMessage, errorMessage)
    _storyId: "default", // make it easier to create unique ids for each input.
  },

  render: (args) => `
<div class="mb-32">${new Formcheck({ ...args, listitems: [{ ...checkboxData.listitems[0], id: `${args._storyId}Checkbox1` }] }).html}</div>
<div class="mb-32">${
    new Formcheck({
      ...checkboxData,
      isValid: args.isValid,
      type: "radio",
      listitems: [
        { ...checkboxData.listitems[0], id: `${args._storyId}Radio1` },
        { ...checkboxData.listitems[1], id: `${args._storyId}Radio2` },
      ],
    }).html
  }</div>
<div class="mb-32">${new Textarea({ ...textAreaData, isValid: args.isValid, id: `${args._storyId}Textarea`, isRequired: true, successMessageText: args.successMessageText, errorMessageText: args.errorMessageText }).html}</div>
<div class="mb-32">${new Textbox({ ...textInputData, isValid: args.isValid, id: `${args._storyId}TextInput`, isRequired: true, successMessageText: args.successMessageText, errorMessageText: args.errorMessageText }).html}</div>
<div class="mb-32">${new Select({ ...selectData, isValid: args.isValid, id: `${args._storyId}SelectInvalid`, isRequired: true, successMessageText: args.successMessageText, errorMessageText: args.errorMessageText }).html}</div>
<div class="mb-32">${new Dateinput({ ...dateInputData, isValid: args.isValid, id: `${args._storyId}DateInvalid`, isRequired: true, successMessageText: args.successMessageText, errorMessageText: args.errorMessageText }).html}</div>
`,

  argTypes,
  parameters: {
    controls: {
      include: ["isValid", "successMessageText", "errorMessageText"],
    },
    backgrounds: { disable: false },
  },
  globals: { backgrounds: { value: "default" } },
};

/**
 * Server side validation with `isValid: false`
 */
export const BootstrapIsInvalid = {
  name: "Server side - invalid",
  args: {
    isValid: false,
    _storyId: "BootstrapIsInvalid",
  },
};

/**
 * Server side validation with `isValid: true`
 */
export const BootstrapIsValid = {
  name: "Server side - valid",
  args: {
    isValid: true,
    _storyId: "BootstrapIsValid",
  },
};

/**
 * Client side validation offers the best user experience, however it not always suit your needs.
 * For client side validation using HTML5 features, add the `novalidate` boolean attribute to your `<form>`.
 * This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript.
 * Try to submit the form below; our JavaScript will intercept the submit button and relay feedback to you.
 * Validation styles using built-in HTML5 validation require class `was-validated` to be added to the `<form>` and rely on the `:invalid` and `:valid` pseudoclasses.
 * #### Multiple input forms and validation feedback
 * Because validation feedback (error or success messages) styles rely on sibling input selectors,
 * it is important to wrap individual form components in a containing div when also providing validation feedback.
 */
export const HTML5NeedsValidation = {
  name: "Client side validation",

  args: {
    ...checkboxData,
    _storyId: "HTML5NeedsValidation",
    listitems: [
      {
        ...checkboxData.listitems[0],
        id: "needs-validation-1",
        label: "Required checkbox (unchecked will be invalid)",
        isChecked: false,
        isRequired: true,
      },
      {
        ...checkboxData.listitems[1],
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
    <div class="col">
      <div class="mb-32">${new Formcheck({ ...args, listitems: [{ ...checkboxData.listitems[0], id: `${args._storyId}CheckboxInvalid` }] }).html}</div>
      <div class="mb-32">${new Textarea({ ...textAreaData, id: `${args._storyId}TextareaInvalid`, value: "", isRequired: true }).html}</div>
      <div class="mb-32">${new Textbox({ ...textInputData, id: `${args._storyId}TextInputInvalid`, value: "", isRequired: true }).html}</div>
      <div class="mb-32">${new Select({ ...selectData, id: `${args._storyId}SelectInvalid`, isRequired: true }).html}</div>
      <div class="mb-32">${new Dateinput({ ...dateInputData, id: `${args._storyId}DateInvalid`, isRequired: true }).html}</div>
    </div>
    <div class="col">
      <div class="mb-32">${new Formcheck({ ...args, listitems: [{ ...checkboxData.listitems[1], id: `${args._storyId}CheckboxValid` }] }).html}</div>
      <div class="mb-32">${new Textarea({ ...textAreaData, id: `${args._storyId}TextareaValid`, value: "I have value!", isRequired: true }).html}</div>
      <div class="mb-32">${new Textbox({ ...textInputData, id: `${args._storyId}TextInputValid`, value: "I have value also!", isRequired: true }).html}</div>
      <div class="mb-32">${new Select({ ...selectData, id: `${args._storyId}SelectValid`, isRequired: true }).html}</div>
      <div class="mb-32">${new Dateinput({ ...dateInputData, id: `${args._storyId}DateValid`, isRequired: true }).html}</div>
    </div>
  </div>
          
  <button class="btn btn-primary mt-3" type="submit" onclick="validateForm(event)">Validate</button>
</form>
<script>
function validateForm(event) {
  event.preventDefault();
  event.stopPropagation();
  const form = event.target.closest('form');

  form.elements["${args._storyId}CheckboxInvalid"].checked = false;
  form.elements["${args._storyId}CheckboxValid"].checked = true;

  form.elements["${args._storyId}TextareaInvalid"].value = "";
  form.elements["${args._storyId}TextareaValid"].value = "I have value!";

  form.elements["${args._storyId}TextInputInvalid"].value = "";
  form.elements["${args._storyId}TextInputValid"].value = "I have value also!";

  form.elements["${args._storyId}SelectInvalid"].value = null;
  form.elements["${args._storyId}SelectValid"].value = "2";

  form.elements["${args._storyId}DateInvalid-dayinput"].value = "";

  form.elements["${args._storyId}DateValid-dayinput"].value = "2";
  form.elements["${args._storyId}DateValid-monthinput"].value = "2";
  form.elements["${args._storyId}DateValid-yearinput"].value = "2222";
  
  form.classList.add('was-validated');
}
</script>`;
  },
};

export const BootstrapInvalidDark = {
  name: "Dark Palette - Invalid",
  args: {
    isValid: false,
    _storyId: "BootstrapInvalidDark",
  },
  parameters: {
    docs: {
      source: {
        excludeDecorators: false,
      },
    },
  },
  globals: { backgrounds: { value: "dark" } },
  decorators: [
    (Story) => {
      return `
<div class="dark">${Story()}</div>`;
    },
  ],
};

export const BootstrapValidDark = {
  name: "Dark Palette - Valid",
  args: {
    isValid: true,
    _storyId: "BootstrapValidDark",
  },
  parameters: {
    docs: {
      source: {
        excludeDecorators: false,
      },
    },
  },
  globals: { backgrounds: { value: "dark" } },
  decorators: [
    (Story) => {
      return `
<div class="dark">${Story()}</div>`;
    },
  ],
};

/**
 * `.valid` and `.invalid` classes on the form or parent element.
 */
export const ValidationComparison = {
  name: "Legacy Validation Comparison",
  args: {
    ...checkboxData,
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
