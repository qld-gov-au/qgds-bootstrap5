export function initGlobalAlerts() {
  const globalAlerts = document.querySelectorAll(".global-alert");

  globalAlerts.forEach((alert) => {
    const variant = alert.getAttribute("data-variant") || "default";
    const dismissedAlert = getLocalStorageWithExpiry(
      `dismissedAlert-${variant}`,
    );

    if (dismissedAlert) {
      alert.classList.add("d-none");
    }

    alert.classList.add("alert");
    alert.querySelector(".qld-global-alert-main").classList.add("container");

    alert.addEventListener("btn-closed", () => {
      const expiry = parseInt(alert.getAttribute("data-expiry"), 10);
      if (expiry && expiry > 0) {
        setLocalStorageWithExpiry(`dismissedAlert-${variant}`, true, expiry);
      }
      alert.classList.add("d-none");
    });
  });

  // basic set local storage function
  function setLocalStorageWithExpiry(key, value, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const item = {
      value: value,
      expiry: d.getTime(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  function getLocalStorageWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    try {
      const item = JSON.parse(itemStr);
      const now = new Date().getTime();

      if (now > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (e) {
      localStorage.removeItem(key);
      return null;
    }
  }
}
