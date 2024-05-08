export function handleQuickExit() {
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
}
