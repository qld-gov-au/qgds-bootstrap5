import React from "react";
import { addons, types } from "storybook/manager-api";
import { ADDON_ID, PANEL_ID } from "./constants";
import { Panel } from "./components/Panel";

// Register the addon
addons.register(ADDON_ID, (api) => {
  // Register a panel on each story view
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Code References",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => active && <Panel active={active} />,
  });
});
