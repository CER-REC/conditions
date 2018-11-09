import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';
import { configureViewport, withViewport } from '@storybook/addon-viewport';
import { withDocs, withReadme } from 'storybook-readme';

export const storiesForComponent = (name, m, readme) => {
  let stories = storiesOf(name, m)
    .addDecorator(withInfo({ header: false, inline: true }))
    .addDecorator(checkA11y);
  if (readme) {
    stories = stories.addDecorator(withDocs(readme));
  }
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
