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
    tabcontent[i].classList.remove("active");
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(tabContent).classList.add("active");
  evt.currentTarget.className += " active";
}
