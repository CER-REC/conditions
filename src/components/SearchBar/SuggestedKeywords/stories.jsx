import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SuggestedKeywords from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SuggestedKeywords', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <SuggestedKeywords onClick={() => alert('clicked')} />
  ));
