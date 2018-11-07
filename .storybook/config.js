import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { configureViewport } from '@storybook/addon-viewport';
import { withOptions } from '@storybook/addon-options';
import Adapter from 'enzyme-adapter-react-16';
import { configure as enzyme } from 'enzyme';

import '../app/styles.scss';

addDecorator(
  withOptions({
    addonPanelInRight: true
  })
)
addDecorator(
  storyFn => <div className="visualization">{storyFn()}</div>,
);

const newViewports = {
  kindleFire2: {
    name: 'Desktop',
    styles: {
      width: '970px',
      height: '1024px'
    }
  },
  kindleFireHD: {
    name: 'iPad',
    styles: {
      width: '768px',
      height: '1024px'
    }
  }
};

configureViewport({
  viewports: newViewports
});


// automatically import all files ending in *.stories.js
const documentationStories = require.context('../stories/', true, /.stories.jsx$/);
const componentStories = require.context('../app/', true, /.stories.jsx$/);
function loadStories() {
  documentationStories.keys().forEach(filename => documentationStories(filename));
  componentStories.keys().forEach(filename => componentStories(filename));
}

enzyme({ adapter: new Adapter() });
configure(loadStories, module);
