import {
  accordionToggleAll,
  accordionToggleAllButtonState,
  accordionHashLinks,
} from "./components/bs5/accordion/accordion.functions";

import {
  videoEmbedPlay,
  videoTranscriptTitle,
} from "./components/bs5/video/video.functions";

// Quick exit
const handleQuickExit = function (e) {
  var quickexitInstances = document.getElementsByClassName('qld-quick-exit');
  if (quickexitInstances.length > 0) {
    const el = document.getElementsByClassName('qld-quick-exit')[0];
    if (document.documentElement.clientWidth > 992) {
      if (window.pageYOffset > 200) {
        el.setAttribute("style", "position: 'fixed', top: '0px'");
      }
      if (window.pageYOffset < 200) {
        el.setAttribute("style", "position: 'sticky', top: '0px'");
      }
    } else {
      el.setAttribute("style", "position: 'fixed', top: 'auto'");
    }
  }
};
window.addEventListener('scroll', handleQuickExit, true);
window.addEventListener('resize', handleQuickExit, true);

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

  })();
});
