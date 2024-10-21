import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import {allModes} from "./../../../.storybook/modes.js";

export const getCanvasMobileProps = () => ({ style: INITIAL_VIEWPORTS.iphone12.styles });

export const getStoryMobileParameters = () => ({
  viewport: {
    defaultViewport: 'iphone12',
  },
  docs: {
    // Opt-out of inline rendering
    story: {
      inline: false,
    },
  },
  chromatic: {
    modes: allModes["mobile"],
  },
});

export const getStoryMobileHeight = () => INITIAL_VIEWPORTS.iphone12.styles.height;
