import { Source, useOf, Markdown } from "@storybook/addon-docs/blocks";
import React, { useState } from "react";

/* Custom MDX components for Storybook documentation pages.
 * These components provide enhanced functionality for rendering
 * code references, metadata, design resources, and notes sections.
 */

/**
 * Custom hook to fetch and provide documentation data from story parameters.
 * This centralises data access for all custom MDX components.
 * @returns {object} An object containing docs data like metadata, template, etc.
 */
const useDocsData = () => {
  // useOf must be called inside a functional component or another hook.
  const resolvedOf = useOf("meta", ["meta"]);
  const docs = resolvedOf.preparedMeta?.parameters?.docs || {};
  const params = resolvedOf.preparedMeta?.parameters || {};

  return {
    componentMetadata:
      docs.componentMetadata || params.coderefs?.metadata || {},
    //codeReferences: docs.codeReferences,
    notes: docs.notes || "",
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
      <h2 id="code-references">{title} 123</h2>
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
 * Renders component metadata using QGDS tags for Category, Type and Status,
 * and displays description as a paragraph.
 * @returns {JSX.Element|null}
 */
export const ComponentMeta = () => {
  const { componentMetadata } = useDocsData();

  if (!componentMetadata) return null;

  const scope = componentMetadata.scope;
  const type = componentMetadata.type;
  const status = componentMetadata.status;
  const description = componentMetadata.description;

  // Don't render if no metadata fields are present
  if (!scope && !type && !status && !description) {
    return null;
  }

  return (
    <div class="mb-32">
      {/* Tags for Category, Type, and Status */}
      {(scope || type || status) && (
        <ul class="tag-list tag-status m-0 p-0 gap-2">
          {scope && <li className="tag-item tag-neutral tag-high">{scope}</li>}
          {type && <li className="tag-item tag-neutral tag-high">{type}</li>}
          {status && (
            <li className="tag-item tag-success  tag-high">{status}</li>
          )}
        </ul>
      )}

      {/* Description as paragraph */}
      {description && (
        <p
          class="pb-16 lead"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      )}
    </div>
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
  const title = componentMetadata?.title || "this component";

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
          title={`View ${title_uikit} in the QGDS UI Kit (Figma)`}
        >
          Figma UI Kit
        </a>
      )}

      {/* Link to Design System website */}
      {url_website && (
        <a
          href={url_website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", marginBottom: "0.5rem" }}
          title={`View ${title} on Design System website`}
        >
          designsystem.qld.gov.au
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
export const Notes = ({ title = "Notes" }) => {
  const { notes } = useDocsData();

  // Hide the section entirely if explicitly set to false
  if (notes?.show === false || notes?.trim() === "") return null;

  return (
    <>
      <h2 id="notes">{title}</h2>
      <Markdown>{notes}</Markdown>
    </>
  );
};

/**
 * Renders instructions for accessing the Code References panel.
 * @returns {JSX.Element}
 */
export const CodeReferencesInstructions = ({ title = "Code references" }) => {
  return (
    <>
      <h2 className="mb-16" id="code-references">
        {title}
      </h2>
      <p>To view code examples, templates, and implementation details:</p>
      <ol>
        <li>Select any story from the sidebar</li>
        <li>
          Open the Actions panel by pressing <kbd>A</kbd>
        </li>
        <li>
          Click the <strong>Code References</strong> tab
        </li>
      </ol>
      <p>
        The Code References panel provides access to Handlebars templates, JSON
        data structures, rendered HTML output, and usage guidelines for each
        component.
      </p>
    </>
  );
};
