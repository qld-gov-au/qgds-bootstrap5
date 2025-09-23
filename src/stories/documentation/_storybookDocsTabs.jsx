import React, { useEffect } from "react";

/**
 * StorybookDocsTabs component renders a tabbed interface for displaying documentation sections.
 *
 * @param {Array} props.tabs - Array of tab objects, each containing id, label, and content to display in the tabbed interface.
 * @returns {JSX.Element} Tabbed documentation interface.
 */
export const StorybookDocsTabs = ({ tabs }) => {
  useEffect(() => {
    // This code will run once the component has mounted
    initTabs();
  }, []);

  function initTabs() {
    let tabButtons = document.querySelectorAll(".tablinks");
    tabButtons.forEach(function (tabButton) {
      tabButton.addEventListener("click", openTab);
    });
  }

  function openTab(evt) {
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
  return (
    <>
      <ul className="qld-sb-docs-tab sb-unstyled">
        {tabs &&
          tabs.map((tab, index) => (
            <li key={`tab-${index}`}>
              <button
                className={`tablinks ${index === 0 ? "active" : ""}`}
                data-targetid={tab.id}
              >
                {tab.label}
              </button>
            </li>
          ))}
      </ul>
      {tabs?.map((tab, index) => (
        <div
          id={tab.id}
          key={`tab-content-${index}`}
          className={`tabcontent ${index === 0 ? "active" : ""}`}
        >
          {tab.heading && <h3>{tab.heading}</h3>}
          {tab.content}
        </div>
      ))}
    </>
  );
};
