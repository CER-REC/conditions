import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { configureViewport } from '@storybook/addon-viewport';
import Adapter from 'enzyme-adapter-react-16';
import { configure as enzyme } from 'enzyme';

import '../app/styles.scss';

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

// Wrap the story in css classes for each of the parent components in its path
addDecorator((storyFn, context) => {
  const { kind } = context;
  if (kind.startsWith('Components|')) {
    // Take everything after components and before the lowest component's folder
    const componentTree = kind.split('|')[1].split('/').slice(0, -1);
    // From the inside out, wrap it in the parent component's name as a classname
    return componentTree.reverse().reduce((acc, next) => (
      <div className={next}>{acc}</div>
    ), storyFn());
  }
  return storyFn();
});

addDecorator(storyFn => <div className="visualization">{storyFn()}</div>);

// automatically import all files ending in *.stories.js
const documentationStories = require.context('../documentation/', true, /.stories.jsx$/);
const componentStories = require.context('../app/', true, /.stories.jsx$/);
function loadStories() {
  documentationStories.keys()
    // Sorting Documentation|Introduction to the top
    .sort((a, b) => (a.startsWith('./Introduction/') ? -1 : a.localeCompare(b)))
    .forEach(filename => documentationStories(filename));
  componentStories.keys().forEach(filename => componentStories(filename));
}

enzyme({ adapter: new Adapter() });
configure(loadStories, module);
