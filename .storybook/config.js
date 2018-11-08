import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { configureViewport, withViewport } from '@storybook/addon-viewport';
import { withOptions } from '@storybook/addon-options';
import Adapter from 'enzyme-adapter-react-16';
import { configure as enzyme } from 'enzyme';

import '../app/styles.scss';

addDecorator(withOptions({ addonPanelInRight: true }));
addDecorator(storyFn => <div className="visualization">{storyFn()}</div>);

const viewports = {
  documentation: {
    name: 'Documentation',
    styles: {
      width: '100%',
      height: '100%',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '970px',
      height: '1024px',
    },
  },
  ipad: {
    name: 'iPad',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
};
configureViewport({ viewports });
addDecorator(withViewport('desktop'));

// automatically import all files ending in *.stories.js
const documentationStories = require.context('../stories/', true, /.stories.jsx$/);
const componentStories = require.context('../app/', true, /.stories.jsx$/);
function loadStories() {
  documentationStories.keys().forEach(filename => documentationStories(filename));
  componentStories.keys().forEach(filename => componentStories(filename));
}

enzyme({ adapter: new Adapter() });
configure(loadStories, module);
