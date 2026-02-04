import { useEffect } from "storybook/preview-api";
import { addons } from "storybook/preview-api";
import Handlebars from "handlebars";

/**
 * Channel Communication Decorator
 *
 * Establishes a channel connection between the Storybook preview (inner iframe)
 * and Storybook manager (outer frame) to send coderefs data to the
 * "Code References" panel whenever a story is rendered or updated.
 *
 * @fires CODEREFS_UPDATE - Emits payload to manager with template, json, html, name, notes, and metadata
 */
export const withCodeRefs = (Story, context) => {
  const { args, parameters } = context;

  const coderefs = parameters.coderefs || {};
  const metadata = coderefs?.metadata || {};
  const storyArgs = coderefs?.args || args;

  useEffect(() => {
    const channel = addons.getChannel();

    // If coderefs.show is explicitly false, send "hide" signal and exit
    if (coderefs.show === false) {
      channel.emit("CODEREFS_UPDATE", { showPanel: false });
      return;
    }

    // Default tabs to show
    const showtabs = {
      htmlstory: coderefs.tabs?.htmlstory !== false,
      htmlcomponent: coderefs.tabs?.htmlcomponent !== false,
      json: coderefs.tabs?.json !== false,
      template: coderefs.tabs?.template !== false,
      howtouse: coderefs.tabs?.howtouse !== false,
      notes: coderefs.tabs?.notes !== undefined,
    };

    // Check if any tabs are visible
    const hasVisibleTabs = Object.values(showtabs).some(Boolean);

    // If no tabs to show, send "hide" signal and exit
    if (!hasVisibleTabs) {
      channel.emit("CODEREFS_UPDATE", { showPanel: false });
      return;
    }

    // Get the story's rendered HTML

    // Full Story HTML
    const htmlstoryContent = Story(args, context);

    // Component only HTML
    const hbspartial = Handlebars.partials[coderefs.partialname] || false;

    if (!hbspartial) {
      console.warn(
        `[CODEREFS] Partial "${coderefs.partialname}" not found in Handlebars partials.`,
      );
    }

    const htmlcomponentContent =
      typeof hbspartial === "string"
        ? Handlebars.compile(hbspartial)(args)
        : "Missing partialname in story config, or component does use a handlebars template.";

    // Data we're sending from preview frame to manager frame
    const payload = {
      showPanel: true,
      showTabs: showtabs,
      template: hbspartial || "No template available",
      json: storyArgs,
      htmlstory: htmlstoryContent,
      htmlcomponent: htmlcomponentContent,
      notes: coderefs.tabs?.notes || "Nil",
      name: context.name || "Unknown",
      partialname: coderefs.partialname || "Unknown",
      metadata: metadata,
    };

    console.log("[PREVIEW] Sending CODEREFS_UPDATE:", payload);
    channel.emit("CODEREFS_UPDATE", payload);
  }, [args, parameters.coderefs]);

  return Story();
};
