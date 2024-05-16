export function positionQuickExit() {
  let quickexitInstances = document.getElementsByClassName('qld-quick-exit');
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
}

export function initQuickexit() {
  var quickExitElement = document.getElementsByClassName('qld-quick-exit');
  var quickExitButton = document.querySelector('.qld-quick-exit-button');

  if (quickExitElement.length > 0 && typeof (quickExitButton) !== 'undefined' && quickExitButton != null) {
    onbtnClick();
    onKeyDown();
  }
}
/**
* onbtnClick -> clicking quick exit button a page
* @return {undefined}
**/
function onbtnClick() {
  const escapeSite = 'https://www.google.com.au/';
  var quickExitButton = document.querySelector('.qld-quick-exit-button');
  quickExitButton.onclick = function () {
    return quickExit(escapeSite);
  }
}

/**
* onKeyDown -> escape keydown event
* @return {undefined}
**/
function onKeyDown() {
  const escapeSite = 'https://www.google.com.au/';
  // add hotkey trigger
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      quickExit(escapeSite);
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
function quickExit(site) {
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
