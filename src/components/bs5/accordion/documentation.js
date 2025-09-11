window.addEventListener("DOMContentLoaded", () => {
  initTabs();
});
export function initTabs() {
  let tabButtons = document.querySelectorAll(".tablinks");
  tabButtons.forEach(function (tabButton) {
    tabButton.addEventListener("click", openCity);
  });
}

export function openCity(evt) {
  const tabContent = evt.currentTarget.dataset.tabcontent;
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabContent).style.display = "block";
  evt.currentTarget.className += " active";
}
