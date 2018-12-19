import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';
import { withViewport } from '@storybook/addon-viewport';
import { withDocs, withReadme } from 'storybook-readme';
import withStatus from './addon-status/';

export const storiesForComponent = (name, m, readme) => {
  let stories = storiesOf(name, m)
    .addDecorator(withInfo({ header: false, inline: true }))
    .addDecorator(checkA11y);
  if (readme) {
    stories = stories.addDecorator(withDocs(readme));
  }
  // Add withStatus after the Readme, to make sure it groups on the outside
  stories = stories.addDecorator(withStatus);
  return stories;
};

export const storiesForView = (name, m, readme) => {
  let stories = storiesOf(name, m)
    .addDecorator(withViewport('desktop'));
  if (readme) {
    stories = stories.addDecorator(withReadme(readme));
  }
  return stories;
};
