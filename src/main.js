import {
  accordionToggleAll,
  accordionToggleAllButtonState,
  accordionHashLinks,
} from "./components/bs5/accordion/accordion.functions";

window.addEventListener("DOMContentLoaded", () => {
  (() => {
    let accordionToggleButton = document.querySelectorAll(
      ".accordion-toggle-btn"
    );

    accordionToggleButton.forEach(function (toggleButton) {
      toggleButton.addEventListener("click", accordionToggleAll);

      let accordionButtons = toggleButton
        .closest(".accordion-group")
        .querySelectorAll(".accordion-button");

      accordionButtons.forEach(function (button) {
        button.addEventListener("click", accordionToggleAllButtonState);
      });
    });

    let inPageLinks = document.querySelectorAll('a[href^="#"]');

    accordionHashLinks();
    window.onhashchange = accordionHashLinks;
    inPageLinks.forEach(function (link) {
      link.addEventListener("click", accordionHashLinks);
    });
  })();
});
