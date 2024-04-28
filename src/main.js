import {
  accordionToggleAll,
  accordionToggleAllButtonState,
  accordionHashLinks,
} from "./components/bs5/accordion/accordion.functions";

import {
  videoEmbedPlay,
  videoTranscriptTitle,
} from "./components/bs5/video/video.functions";

import { initializeNavbar } from './components/bs5/navbar/navbar.functions';

window.addEventListener("DOMContentLoaded", () => {
  (() => {
    // Accordion
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

    let inPageLinks = document.querySelectorAll('a[href^="#"]');

    accordionHashLinks();
    window.onhashchange = accordionHashLinks;
    inPageLinks.forEach(function (link) {
      link.addEventListener("click", accordionHashLinks);
    });


    // Video
    let videoThumbnails = document.querySelectorAll('.video-thumbnail');

    videoThumbnails.forEach(function (thumbnail) {
      thumbnail.addEventListener("click", videoEmbedPlay)
    })

    let videoTranscripts = document.querySelectorAll('.video .accordion .accordion-button');

    videoTranscripts.forEach(function (transcript) {
      transcript.addEventListener("click", videoTranscriptTitle)
    })

    // Navbar
    if (window.innerWidth > 992) {
      initializeNavbar();
    } 
  })();
});