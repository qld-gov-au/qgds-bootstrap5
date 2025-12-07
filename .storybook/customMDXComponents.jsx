import { Source, useOf } from "@storybook/addon-docs/blocks";
import React, { useState } from "react";

/**
 * Custom hook to fetch and provide documentation data from story parameters.
 * This centralises data access for all custom MDX components.
 * @returns {object} An object containing docs data like metadata, template, etc.
 */
const useDocsData = () => {
  // useOf must be called inside a functional component or another hook.
  const resolvedOf = useOf("meta", ["meta"]);
  const docs = resolvedOf.preparedMeta?.parameters?.docs || {};
  //const design = resolvedOf.preparedMeta?.parameters?.design;

  return {
    componentData: docs.componentData,
    componentTemplate: docs.componentTemplate || docs.hbsTemplate, // Support both names
    componentMetadata: docs.componentMetadata,
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
export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = React.Children.toArray(children).filter(
    (child) => child.type === Tab,
  );

  return (
    <div className="qgds-tabs-container" style={{ marginTop: "1.5rem" }}>
      <div
        className="qgds-tabs-nav"
        style={{
          borderBottom: "1px solid #e0e0e0",
          marginBottom: "1rem",
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
 * Renders JSON data sources from `parameters.docs.componentData`.
 * @returns {JSX.Element|null}
 */
export const ComponentDataSources = () => {
  const { componentData } = useDocsData();

  if (!componentData) return null;

  const dataArray = Array.isArray(componentData)
    ? componentData
    : [{ title: "Component Data", data: componentData }];

  return (
    <>
      {dataArray.map((item, index) => (
        <div key={index} style={{ marginBottom: "2rem" }}>
          {item.title && <h4>{item.title}</h4>}
          <Source
            format="dedent"
            dark
            language="json"
            code={JSON.stringify(item.data, null, 2)}
          />
        </div>
      ))}
    </>
  );
};

/**
 * Renders the Handlebars template from `parameters.docs.componentTemplate`.
 * @returns {JSX.Element|null}
 */
export const ComponentTemplate = () => {
  const { componentTemplate } = useDocsData();

  if (!componentTemplate) return null;

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <Source
          format="dedent"
          dark
          language="handlebars"
          code={componentTemplate}
        />
      </div>
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
    { key: "Status", value: componentMetadata.status },
    { key: "Category", value: componentMetadata.category },
    { key: "Tags", value: componentMetadata.tags?.join(", ") },
  ].filter((item) => item.value);

  if (metadataItems.length === 0) {
    return null;
  }

  return (
    <table className="table">
      {metadataItems.map((item) => (
        // Use a React.Fragment for each TR
        <>
          <tr>
            <th className="fw-bold fst-normal m-0 p-2">{item.key}</th>
            <td className="m-0 p-2">{item.value}</td>
          </tr>
        </>
      ))}
    </table>
  );
};

/**
 * Renders links to design resources like Figma.
 * @returns {JSX.Element|null}
 */

export const DesignResources = () => {
  const { componentMetadata } = useDocsData();
  const figmaUrl = componentMetadata?.urls?.uikit || null;
  const description = componentMetadata?.description || null;

  if (!figmaUrl) return null;

  return (
    <>
      <p>{description}</p>
      <a href={figmaUrl} target="_blank" rel="noopener noreferrer">
        View component in Figma
      </a>
    </>
  );
};
