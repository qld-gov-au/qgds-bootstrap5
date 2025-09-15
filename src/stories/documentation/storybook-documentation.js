window.addEventListener("DOMContentLoaded", () => {
  initTabs();
});
export function initTabs() {
  let tabButtons = document.querySelectorAll(".tablinks");
  tabButtons.forEach(function (tabButton) {
    tabButton.addEventListener("click", openTab);
  });
}

export function openTab(evt) {
  const targetId = evt.currentTarget.dataset.targetid;

  ["tabcontent", "tablinks"].forEach((cls) =>
    document
      .querySelectorAll(`.${cls}`)
      .forEach((el) => el.classList.remove("active")),
  );

  if (targetId) {
    document.getElementById(targetId)?.classList.add("active");
    evt.currentTarget.classList.add("active");
  }
}
