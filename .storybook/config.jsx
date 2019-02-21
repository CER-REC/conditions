import requireContext from 'require-context.macro';
import React from 'react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { configureViewport } from '@storybook/addon-viewport';
import Adapter from 'enzyme-adapter-react-16';
import { configure as enzyme } from 'enzyme';

// Load Locale Data
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';

import i18nMessages from '../src/i18n';

import '../src/styles.scss';

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

setIntlConfig({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  getMessages: locale => i18nMessages[locale],
});

addDecorator(withIntl);

const viewports = {
  fullscreen: {
    name: 'Fullscreen',
    styles: { width: '100%', height: '100%' },
  },
  desktop: {
    name: 'Desktop',
    styles: { width: '970px', height: '1024px' },
  },
  ipad: {
    name: 'iPad',
    styles: { width: '768px', height: '1024px' },
  },
};
configureViewport({ viewports, defaultViewport: 'fullscreen' });

addDecorator(withOptions({
  addonPanelInRight: true,
  hierarchyRootSeparator: /\|/, // Categories with |
  hierarchySeparator: /\//, // Sub-stories with /
}));

addDecorator(storyFn => <div className="visualization">{storyFn()}</div>);

// automatically import all files named stories.jsx
const documentationStories = requireContext('../documentation/', true, /stories.jsx$/);
const componentStories = requireContext('../src/', true, /stories.jsx$/);
function loadStories() {
  documentationStories.keys()
    // Sorting Documentation|Introduction to the top
    .sort((a, b) => (a.startsWith('./Introduction/') ? -1 : a.localeCompare(b)))
    .forEach(filename => documentationStories(filename));
  componentStories.keys().forEach(filename => componentStories(filename));
}

enzyme({ adapter: new Adapter() });
configure(loadStories, module);
