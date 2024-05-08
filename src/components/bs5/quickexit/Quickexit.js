import Component from '../../../js/QGDSComponent.js'
import template from "./quickexit.hbs?raw";

export class Quickexit {

  // Use the global Component class to create a new instance of the Loading Quickexit component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument. 

  constructor(data = {}) {
    var component = new Component(template, data);
    this.quickExitElement = document.getElementsByClassName('qld-quick-exit');
    this.quickExitButton = document.querySelector('.qld-quick-exit-button');
    this.escapeSite = 'https://www.google.com.au/';
    this.hotkey = 27;
    this.initQuickexit();
    return component;
  }

  initQuickexit() {
    if (this.quickExitElement.length > 0 && typeof (this.quickExitButton) !== 'undefined' && this.quickExitButton != null) {
      this.onbtnClick();
      this.onKeyDown();
    }
  }
  /**
  * onbtnClick -> clicking quick exit button a page
  * @return {undefined}
  **/
  onbtnClick() {
    const self = this;
    this.quickExitButton.onclick = function () {
      return self.quickExit(self.escapeSite);
    };
  }

  /**
  * onKeyDown -> escape keydown event
  * @return {undefined}
  **/
  onKeyDown() {
    const self = this;
    // add hotkey trigger
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === self.hotkey) {
        self.quickExit(self.escapeSite);
        if (e) {
          // stop escape from cancelling redirect
          e.preventDefault();
          // early IEs don't have preventDefault
          e.returnValue = false;
        }
        return false;
      }
    });
  }

  /**
  * quickExit function redirects a user on click and Esc key down
  * @param {string} site - site to replace on initiating the 'quick exit' ('Esc' key or clicking 'Close this site' button) function
  * @return {undefined}
  **/
  quickExit(site) {
    // then redirect to a non-sensitive site
    window.open(site, '_blank');
    window.location.replace(site);
    // remove as much info from URL as possible
    if (window.history) {
      try {
        window.history.replaceState({}, '', '/');
      } catch (e) {
        e.printStackTrace();
      }
    }
    // disable default event handling
    return false;
  }
}
