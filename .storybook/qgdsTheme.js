import { create } from '@storybook/theming/create';
import coa from '../src/assets/img/_coa_header-logo-qgov-fixed-white--stacked.svg';

export default create({
  base: 'dark',
  brandTitle: 'QGDS',
  brandUrl: 'https://qld.gov.au',
  brandImage: coa,
  brandTarget: '_self',
});