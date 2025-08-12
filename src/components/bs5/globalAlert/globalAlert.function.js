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

    // Handle both Bootstrap alert close event and custom btn-closed event
    const handleAlertClose = () => {
      const expiryDays = parseInt(alert.getAttribute("data-expiry-days"), 10);

      // Only save to localStorage if both ID and valid expiry exist
      if (id && expiryDays && expiryDays > 0) {
        setLocalStorageWithExpiry(`dismissedAlert-${id}`, true, expiryDays);
      }

      alert.classList.add("d-none");
    };

    // Listen for Bootstrap's close event (for Storybook compatibility)
    alert.addEventListener("closed.bs.alert", handleAlertClose);

    // Listen for custom btn-closed event (for existing functionality)
    alert.addEventListener("btn-closed", handleAlertClose);
  });

  // basic set local storage function
  function setLocalStorageWithExpiry(key, value, expiryDays) {
    const d = new Date();
    d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);
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
