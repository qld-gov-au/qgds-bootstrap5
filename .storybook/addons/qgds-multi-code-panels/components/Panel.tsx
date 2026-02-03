import React, { memo, useState } from "react";

import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import {
  AddonPanel,
  TabsState,
  P,
  SyntaxHighlighter,
} from "storybook/internal/components";
import { useChannel, useStorybookApi } from "storybook/manager-api";
import { useTheme } from "storybook/theming";

interface PanelProps {
  active?: boolean;
}

interface ShowTabs {
  template?: boolean;
  json?: boolean;
  htmlstory?: boolean;
  htmlcomponent?: boolean;
  howtouse?: boolean;
  notes?: boolean;
}

// Single interface for both incoming data and state
interface PanelContent {
  template: string;
  htmlstory: string;
  htmlcomponent: string;
  json: any;
  notes: string;
  name: string;
  partialname: string;
  showPanel: boolean;
  showTabs: ShowTabs;
  metadata: any;
}

let lastCodeRefs: PanelContent | null = null;

// Format code with Prettier
const formatCode = async (code: string): Promise<string> => {
  if (!code) return "";

  try {
    return await prettier.format(code, {
      parser: "html",
      plugins: [parserHtml],
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: "ignore",
    });
  } catch (error) {
    console.warn("Failed to format:", error);
    return code;
  }
};

export const Panel: React.FC<PanelProps> = memo(function MyPanel({ active }) {
  const api = useStorybookApi();
  const storyId = api.getCurrentStoryData()?.id || "N/A";

  const theme = useTheme();
  const [content, setContent] = useState<PanelContent | null>(lastCodeRefs);

  useChannel({
    CODEREFS_UPDATE: async (data: PanelContent) => {
      // If showPanel is false or no showTabs defined, clear the content
      if (!data.showPanel || !data.showTabs) {
        setContent(null);
        lastCodeRefs = null;
        return;
      }

      const [formattedTemplate, formattedHtmlStory, formattedHtmlComponent] =
        await Promise.all([
          formatCode(data.template),
          formatCode(data.htmlstory),
          formatCode(data.htmlcomponent),
        ]);

      const newContent = {
        template: formattedTemplate,
        htmlstory: formattedHtmlStory,
        htmlcomponent: formattedHtmlComponent,
        json: data.json,
        notes: data.notes,
        name: data.name,
        partialname: data.partialname,
        metadata: data.metadata,
        showPanel: data.showPanel,
        showTabs: data.showTabs,
      };
      setContent(newContent);
      lastCodeRefs = newContent;
    },
  });

  // Build visible tabs array
  const buildTabs = () => {
    if (!content) return [];

    const tabs: React.ReactElement[] = [];

    if (content.showTabs.htmlstory !== false) {
      tabs.push(
        <div
          key="htmlstory"
          id="htmlstory"
          title="HTML (Story)"
          color={theme.color.defaultText}
        >
          <div style={{ padding: "20px" }}>
            <SyntaxHighlighter language="html" copyable={true}>
              {content.htmlstory}
            </SyntaxHighlighter>
          </div>
        </div>,
      );
    }

    if (content.showTabs.htmlcomponent !== false) {
      tabs.push(
        <div
          key="htmlcomponent"
          id="htmlcomponent"
          title="HTML (Component)"
          color={theme.color.defaultText}
        >
          <div style={{ padding: "20px" }}>
            <SyntaxHighlighter language="html" copyable={true}>
              {content.htmlcomponent}
            </SyntaxHighlighter>
          </div>
        </div>,
      );
    }

    if (content.showTabs.template !== false) {
      tabs.push(
        <div
          key="template"
          id="template"
          title="Handlebars"
          color={theme.color.defaultText}
        >
          <div style={{ padding: "20px" }}>
            <SyntaxHighlighter language="html" copyable={true}>
              {content.template}
            </SyntaxHighlighter>
          </div>
        </div>,
      );
    }

    if (content.showTabs.json !== false) {
      tabs.push(
        <div
          key="params"
          id="params"
          title="Data"
          color={theme.color.defaultText}
        >
          <div style={{ padding: "20px" }}>
            <SyntaxHighlighter language="json" copyable={true}>
              {JSON.stringify(content.json, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>,
      );
    }

    if (content.showTabs.notes) {
      tabs.push(
        <div
          key="notes"
          id="notes"
          title="Notes"
          color={theme.color.defaultText}
        >
          <div style={{ padding: "20px" }}>
            <P>{content.notes}</P>
          </div>
        </div>,
      );
    }

    if (content.showTabs.howtouse) {
      tabs.push(
        <div
          key="howtouse"
          id="howtouse"
          title="Use"
          color={theme.color.defaultText}
        >
          <div style={{ padding: "20px" }}>
            <SyntaxHighlighter language="typescript" copyable={true}>
              {`const data = ${JSON.stringify(content.json, undefined, 2)}; \n\nconst html = Handlebars.compile(\`{{> ${content.partialname} }}\`)(data);`}
            </SyntaxHighlighter>
          </div>
        </div>,
      );
    }

    return tabs;
  };

  const tabs = buildTabs();
  const initialTab = tabs.length > 0 ? tabs[0].props.id : "template";

  return (
    <AddonPanel active={active ?? false}>
      {content === null || tabs.length === 0 ? (
        <div style={{ padding: "20px", color: "#999" }}>
          Code references are disabled for this story.
        </div>
      ) : (
        <TabsState
          initial={initialTab}
          backgroundColor={theme.background.hoverable}
          key={`story-codetabs-${storyId}`}
        >
          {tabs}
        </TabsState>
      )}
    </AddonPanel>
  );
});
