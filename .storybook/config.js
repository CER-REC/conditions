import { addDecorator, configure } from '@storybook/react';
import { configureViewport } from '@storybook/addon-viewport';
import { withOptions } from '@storybook/addon-options';
import Adapter from 'enzyme-adapter-react-16';
import { configure as enzyme } from 'enzyme';


addDecorator(
  withOptions({
    addonPanelInRight: true
  })
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
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

enzyme({ adapter: new Adapter() });
configure(loadStories, module);
