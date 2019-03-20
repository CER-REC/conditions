import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import GuideDetail from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ConditionExplorer/GuideDetail', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => <GuideDetail />);
