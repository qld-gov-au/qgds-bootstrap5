// qgds-plugin-story-list-builder.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, "./../../src/components/bs5");
const STORY_LIST_FILE = path.resolve(
  __dirname,
  "../../src/stories/component-list.json",
);

function getAllMetadataFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (file.isDirectory()) {
      arrayOfFiles = getAllMetadataFiles(
        path.join(dirPath, file.name),
        arrayOfFiles,
      );
    } else if (file.isFile() && file.name === "metadata.json") {
      arrayOfFiles.push(path.join(dirPath, file.name));
    }
  });

  return arrayOfFiles;
}

function readMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const metadata = JSON.parse(content);

    // Try to find corresponding .stories.js file
    const componentDir = path.dirname(filePath);
    const componentName = path.basename(componentDir);
    const storyFiles = fs
      .readdirSync(componentDir)
      .filter((f) => f.endsWith(".stories.js"));

    let storyTitle = null;
    if (storyFiles.length > 0) {
      const storyPath = path.join(componentDir, storyFiles[0]);
      const storyContent = fs.readFileSync(storyPath, "utf8");
      const titleMatch = storyContent.match(/title:\s*["']([^"']+)["']/);
      storyTitle = titleMatch ? titleMatch[1] : null;
    }

    return {
      id: metadata.id,
      title: metadata.title,
      title_uikit: metadata.title_uikit,
      type: metadata.type,
      scope: metadata.scope,
      group: metadata.group || "Components",
      status: metadata.status,
      description: metadata.description,
      refs: metadata.refs,
      storyTitle: storyTitle,
      storyPath: storyTitle
        ? `/docs/${storyTitle.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/\./g, "")}`
        : null,
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

export default function QGDSStoryListBuilderPlugin() {
  return {
    name: "story-list-builder",
    setup(build) {
      build.onStart(async () => {
        const files = getAllMetadataFiles(COMPONENTS_DIR);
        // Sort files alphabetically to ensure deterministic ordering
        files.sort((a, b) =>
          path
            .basename(path.dirname(a))
            .localeCompare(path.basename(path.dirname(b))),
        );

        const componentList = [];

        for (const file of files) {
          const metadata = readMetadata(file);
          if (metadata && metadata.status === "Published") {
            componentList.push(metadata);
          }
        }

        //Sort component list by title
        componentList.sort((a, b) => a.title.localeCompare(b.title));

        // Write as JSON for easy import
        fs.writeFileSync(
          STORY_LIST_FILE,
          JSON.stringify(componentList, null, 2),
        );

        console.log(
          `${componentList.length} components found and written to ${STORY_LIST_FILE}`,
        );
      });
    },
  };
}
