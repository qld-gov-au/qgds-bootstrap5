import {
  accordionToggleAll,
  accordionToggleAllButtonState,
  accordionHashLinks,
} from "./../components/bs5/accordion/accordion.functions";
import { videoEmbedPlay, videoTranscriptTitle } from "./../components/bs5/video/video.functions";
import { initializeNavbar } from "./../components/bs5/navbar/navbar.functions";
import { initBreadcrumb } from "./../components/bs5/breadcrumbs/breadcrumb.functions";
import { positionQuickExit, initQuickexit } from "./../components/bs5/quickexit/quickexit.functions";
import { displayFeedbackForm } from "./../components/bs5/footer/footer.functions";
import { toggleSearch } from "./../components/bs5/header/header.functions";
import { showSuggestions, submitSearchForm } from "./../components/bs5/searchInput/search.functions";

window.addEventListener("scroll", positionQuickExit, true);
window.addEventListener("resize", positionQuickExit, true);
window.addEventListener("click", initQuickexit, true);
window.addEventListener("keydown", initQuickexit, true);

window.addEventListener("DOMContentLoaded", () => {
  (() => {
    // Footer FormIO Action
    // Note: This is added here, as there is an issue with breadcrumbShorten() function.
    //       Will move this once that issue is fixed.
    const footerFormio = document.getElementById("qg-feedback-toggle");
    if (footerFormio) {
      displayFeedbackForm();
    }

    //Header search
    let headerSearchButton = document.querySelector(".qld__main-nav__toggle-search");
    if (headerSearchButton) {
      document.querySelector(".qld__main-nav__toggle-search").addEventListener("click", toggleSearch);
    }

    // Get all forms with the class 'site-search'
    let forms = document.querySelectorAll(".site-search");
    forms.forEach((form) => {
      // Get the search input within the current form
      let searchInput = form.querySelector('.qld-search-input input');

      if (searchInput) {
        let timeout;

        // Add keyup event listener to the search input
        searchInput.addEventListener("keyup", function () {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            showSuggestions(this.value, false, form);
          }, 300);
        });

        // Add focus event listener to the search input
        searchInput.addEventListener("focus", function () {
          showSuggestions("", true, form);
        });

        // Add click event listener to the search input
        searchInput.addEventListener("click", function () {
          if (this.value === "") {
            showSuggestions("", true, form);
          }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', function(event) {
          if (!form.contains(event.target) && !form.querySelector('.suggestions').contains(event.target)) {
            form.querySelector('.suggestions').style.display = 'none';
          }
        });

        // Attach event listener to form submit
        form.addEventListener('submit', function (event) {
          event.preventDefault();
          const query = searchInput.value.trim();
          submitSearchForm(query, form);
        });
      }
    });

    //Header
    // Get the <header> element
    let header = document.querySelector("header");
    if (header) {
      // Get the current page URL without query string parameters
      let url = window.location.origin + window.location.pathname;
      // Set the data-page-url attribute on the <header> element
      header.setAttribute("data-page-url", url);
    }

    // Navbar
    initializeNavbar();

    // Breadcrumb
    initBreadcrumb();

    // Quick exit
    window.addEventListener("scroll", positionQuickExit, true);
    window.addEventListener("resize", positionQuickExit, true);
    window.addEventListener("click", initQuickexit, true);
    window.addEventListener("keydown", initQuickexit, true);
    initQuickexit();
    positionQuickExit();

    // Accordion
    let accordionToggleButton = document.querySelectorAll(".accordion-toggle-btn");

    accordionToggleButton.forEach(function (toggleButton) {
      toggleButton.addEventListener("click", accordionToggleAll);

      let accordionButtons = toggleButton.closest(".accordion-group").querySelectorAll(".accordion-button");

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

    // Video
    let videoThumbnails = document.querySelectorAll(".video-thumbnail");

    videoThumbnails.forEach(function (thumbnail) {
      thumbnail.addEventListener("click", videoEmbedPlay);
    });

    let videoTranscripts = document.querySelectorAll(".video .accordion .accordion-button");

    videoTranscripts.forEach(function (transcript) {
      transcript.addEventListener("click", videoTranscriptTitle);
    });
  })();
});
