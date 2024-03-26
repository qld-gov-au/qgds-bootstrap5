import {
  accordionToggleAll,
  accordionToggleAllButtonState,
} from "./components/bs5/accordion/accordion.functions";

window.addEventListener("DOMContentLoaded", () => {
  (() => {
    let accordionToggleButton = document.querySelectorAll(".accordion-toggle-btn");

    accordionToggleButton.forEach(function (toggleButton) {
      toggleButton.addEventListener("click", accordionToggleAll);

      let accordionButtons = toggleButton
        .closest(".accordion-group")
        .querySelectorAll(".accordion-button");

      accordionButtons.forEach(function (button) {
        button.addEventListener("click", accordionToggleAllButtonState);
      });
    });

  })();
});
