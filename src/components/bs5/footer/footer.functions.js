/**
 * Init footer formio feedback form
 *
 * @memberof module:Footer
 *
 * @returns {void}
 */
export function displayFeedbackForm() {
  if (typeof FormioScript === "object") {
    // eslint-disable-next-line no-undef
    FormioScript.init();
  } else {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", "https://static.qgov.net.au/formio-qld/v2/v2.x.x-latest/formio-script.min.js");
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", true);

    document.body.appendChild(scriptEle);

    scriptEle.addEventListener("load", () => {
      // eslint-disable-next-line no-undef
      FormioScript.init();
    });
    // error event
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
      });
    }
  }
}
