export function updateGlobalAlerts() {
  const globalAlerts = document.querySelectorAll(".global-alert");

  let dismissedAlertsCookie = getCookie("forgovDismissedAlert");

  globalAlerts.forEach((alert) => {
    if (dismissedAlertsCookie) {
      alert.classList.add("d-none");
    }

    alert.classList.add("alert");
    alert.querySelector(".qld-global-alert-main").classList.add("container");

    alert.addEventListener("btn-closed", () => {
      setCookie("forgovDismissedAlert", true, 14, "lax");
      alert.classList.add("d-none");
    });
  });

  // basic set cookie function
  function setCookie(cname, cvalue, exdays, sameSite) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      cname +
      "=" +
      cvalue +
      ";" +
      expires +
      ";path=/" +
      ";samesite=" +
      sameSite;
  }

  function getCookie(cname) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(cname))
      ?.split("=")[1];

    return cookieValue;
  }
}
