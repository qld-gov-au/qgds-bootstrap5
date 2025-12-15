import { Source, useOf, Markdown } from "@storybook/addon-docs/blocks";
import React, { useState } from "react";

// Import prettier and specific parsers
// import prettier from "prettier/standalone";
// import parserBabel from "prettier/parser-babel";
// import parserHtml from "prettier/parser-html";
// import parserPostcss from "prettier/parser-postcss";

/**
 * Custom hook to fetch and provide documentation data from story parameters.
 * This centralises data access for all custom MDX components.
 * @returns {object} An object containing docs data like metadata, template, etc.
 */
const useDocsData = () => {
  // useOf must be called inside a functional component or another hook.
  const resolvedOf = useOf("meta", ["meta"]);
  const docs = resolvedOf.preparedMeta?.parameters?.docs || {};

  return {
    componentMetadata: docs.componentMetadata,
    codeReferences: docs.codeReferences,
    howToUse: docs.howToUse,
    hasData: (key) => docs[key] !== undefined && docs[key] !== null,
  };
};

/**
 * A simple wrapper for individual tab content.
 * @param {object} props
 * @param {string} props.label The text to display on the tab button.
 * @param {React.ReactNode} props.children The content to render inside the tab panel.
 */
export const Tab = ({ children }) => {
  // This component is a simple wrapper and doesn't render anything on its own.
  // The Tabs component will handle the rendering.
  return <>{children}</>;
};

/**
 * A container component that renders a tabbed interface.
 * It uses the children's props to create tab buttons and panels.
 * @param {object} props
 * @param {React.ReactElement<typeof Tab>[]} props.children One or more <Tab> components.
 */
export const Tabs = ({ title, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = React.Children.toArray(children).filter(
    (child) => child.type === Tab,
  );

  return (
    <div className="qgds-tabs-container d-flex" style={{ marginTop: "1.5rem" }}>
      <div
        className="qgds-tabs-nav"
        style={{
          borderRight: "1px solid #e0e0e0",
          marginRight: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "0.75rem 1.25rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: activeTab === index ? "bold" : "normal",
              color: activeTab === index ? "#005f8f" : "#333",
              borderBottom:
                activeTab === index
                  ? "3px solid #005f8f"
                  : "3px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="qgds-tabs-content">{tabs[activeTab]}</div>
    </div>
  );
};

/**
 * Conditional wrapper for code reference tabs with granular control
 * @param {object} props
 * @param {string} props.title - Title for the section
 * @returns {JSX.Element|null}
 */
export const CodeReferences = ({ title = "Code references" }) => {
  const { codeReferences } = useDocsData();

  // Don't render if no codeReferences array is provided
  if (
    !codeReferences ||
    !Array.isArray(codeReferences) ||
    codeReferences.length === 0
  ) {
    return null;
  }

  return (
    <>
      <h2 id="code-references">{title}</h2>
      <Tabs>
        {codeReferences.map((item, index) => {
          // Handle different content types
          let sourceContent;
          let language = item.language || "text";
          let label = item.label || `Tab ${index + 1}`;

          if (item.language === "json" && typeof item.content === "object") {
            // JSON objects need to be stringified
            sourceContent = JSON.stringify(item.content, null, 2);
          } else {
            // For strings (handlebars, html, etc.) or other content
            sourceContent = item.content;
          }

          return (
            <Tab key={index} label={label}>
              <Source
                format="dedent"
                dark
                language={language}
                code={sourceContent}
              />
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

/**
 * Renders component metadata tags like status and category.
 * @returns {JSX.Element|null}
 */
export const ComponentMeta = () => {
  const { componentMetadata } = useDocsData();

  if (!componentMetadata) return null;

  // Create an array of key-value pairs to render, filtering out empty values
  const metadataItems = [
    { key: "ID", value: componentMetadata.id },
    { key: "Version", value: componentMetadata.version },
    { key: "Category", value: `${componentMetadata.scope}` },
    { key: "Type", value: componentMetadata.type },
    { key: "Status", value: componentMetadata.status },
    { key: "Tags", value: componentMetadata.tags?.join(", ") },
  ].filter((item) => item.value);

  if (metadataItems.length === 0) {
    return null;
  }

  return (
    <table className="table">
      <tbody>
        {metadataItems.map((item, index) => (
          <tr key={index}>
            <th className="fw-bold fst-normal m-0 p-2">{item.key}</th>
            <td
              className="m-0 p-2"
              dangerouslySetInnerHTML={{ __html: item.value }}
            ></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/**
 * Renders links to design resources like Figma.
 * @returns {JSX.Element|null}
 */
export const DesignResources = () => {
  const { componentMetadata } = useDocsData();
  const title_uikit = componentMetadata?.title_uikit || "";
  const url_uikit = componentMetadata?.refs?.uikit || null;
  const url_website = componentMetadata?.refs?.website || null;

  if (!url_uikit && !url_website) return null;

  return (
    <>
      <h2 className="mb-16" id="design-resources">
        Design resources
      </h2>

      {/* Link to Figma */}
      {url_uikit && (
        <a
          href={url_uikit}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          QGDS UI Kit (Figma) - {title_uikit}
        </a>
      )}

      {/* Link to Design System website */}
      {url_website && (
        <a
          href={url_website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          View component on Design System website
        </a>
      )}
    </>
  );
};

/**
 * Renders usage instructions, either default or custom markdown content.
 * @param {object} props
 * @param {string} props.title - The title/heading for this section
 * @returns {JSX.Element|null}
 */
export const HowToUse = ({ title = "How to use" }) => {
  const { howToUse, componentMetadata } = useDocsData();

  const partialName = componentMetadata?.refs?.partialName || "partialname";

  // Hide the section entirely if explicitly set to false
  if (howToUse?.show === false) return null;

  // Unless custom content was provided, render default usage instructions
  if (!howToUse?.customMarkdown || howToUse.customMarkdown.trim() === "") {
    return (
      <>
        <h2 id="how-to-use">{title}</h2>
        <p>
          The QGDS library uses{" "}
          <a href="https://handlebarsjs.com/">Handlebars</a> partials for HTML
          rendering. See the{" "}
          <a href="/docs/getting-started--docs">Getting Started guide</a> for
          detailed setup instructions and resource loading.
        </p>

        <Source
          format="dedent"
          light
          language="javascript"
          code={`// Ensure Handlebars, component partials and helpers are already loaded in your project. See getting-started guide 

const componentData = {
  /* Provide a data object for this component - refer to examples above */
};

// Generate HTML string by compiling the relevant Handlebars partial with your data 
const htmlString = Handlebars.compile('{{> ${partialName}}}')(componentData);`}
        />
      </>
    );
  }

  // Render custom markdown content from story parameters
  return (
    <>
      <Markdown>{howToUse.customMarkdown}</Markdown>
    </>
  );
};
