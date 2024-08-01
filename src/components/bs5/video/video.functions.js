/**
 * Show and play the embedded video
 *
 * @memberof module:Video
 *
 * @param  {Object}  event - The event that triggered this function.
 * @returns {void}
 */
export function videoEmbedPlay(event) {
  event.preventDefault();

  const thumbnail = event.target,
    component = thumbnail.closest(".video"),
    iframe = component.querySelector(".video-embed iframe")

  component.classList.remove("not-ready");

  // Parse iFrame URL and set the 'autoplay' parameter to 1.
  if (!iframe.classList.contains("video-custom")) {
    const url = new URL(iframe.src);
    url.searchParams.set('autoplay', '1');
    iframe.src = url.toString();
  }

  iframe.focus();

}

/**
 * Toggle the title of the video transcript accordion
 *
 * @memberof module:Video
 *
 * @param  {Object}  event - The event that triggered this function.
 * @returns {void}
 */
export function videoTranscriptTitle(event) {
  const accordionButton = event.target

  if (accordionButton.classList.contains('collapsed')) {
    accordionButton.textContent = "Show transcript"
  }
  else {
    accordionButton.textContent = "Hide transcript"
  }

}
