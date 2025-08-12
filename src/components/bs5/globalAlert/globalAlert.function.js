export function initGlobalAlerts() {
  const globalAlerts = document.querySelectorAll(".global-alert");

  globalAlerts.forEach((alert) => {
    const id = alert.getAttribute("data-id");

    // Only check localStorage if there's an ID
    if (id) {
      const dismissedAlert = getLocalStorageWithExpiry(`dismissedAlert-${id}`);
      if (!dismissedAlert) {
        alert.classList.remove("d-none");
      }
    } else {
      alert.classList.remove("d-none");
    }

    alert.addEventListener("btn-closed", () => {
      const expiry = parseInt(alert.getAttribute("data-expiry"), 10);

      // Only save to localStorage if both ID and valid expiry exist
      if (id && expiry && expiry > 0) {
        setLocalStorageWithExpiry(`dismissedAlert-${id}`, true, expiry);
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
