/**
 * @file Accordion.stories.js
 * @description Storybook configuration file for the Accordion component.
 * @module Accordion.stories
 */

import { Accordion } from './Accordion.js';
import defaultdata from './accordion.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Accordion',
  render: (args) => new Accordion(args).html,
};

// Default Accordion story
export const Default = {
  args: defaultdata,
};
