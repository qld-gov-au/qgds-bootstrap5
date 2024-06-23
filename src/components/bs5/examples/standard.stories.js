import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { SearchInput } from "../searchInput/SearchInput";
import { Footer } from "../footer/Footer";

// Mock data
import { header, search, navigation, footer } from './example.data.json';

export default {
  title: 'Examples/Standard template',
  render: (args) => {
    const headerHtml = new Header({ ...args, searchInput: new SearchInput(search).html }).html;
    const navbarHtml = new Navbar(navigation).html;
    const footerHtml = new Footer(footer).html;
    return `${headerHtml}${navbarHtml}${footerHtml}`;
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Masterbrand = {
  args: {
    ...header,
    ...navigation,
    ...footer,
  },
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: 'var(--qld-light-background)' },
      ],
    },
  },
};
