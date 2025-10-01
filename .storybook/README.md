## What stops Turbo Snapshots

The key files that will always trigger a full run if touched include:

*  .storybook/main.js / .storybook/main.ts
* .storybook/preview.js / .storybook/preview.ts
* .storybook/manager.js
* Any addons.js or config imports that affect global decorators/parameters

Any file linked to preview.js i.e. transitive dependencies could also trigger a skip (i.e. if css is altered it would then run the full build to pick up regressions, if hbs files are just altered or a new story is added then it would not rebuild the full project)
