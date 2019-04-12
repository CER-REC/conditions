import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import GuideDetail from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ConditionExplorer/GuideDetail', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: { selected: 1 },
    actions: { changeStep: () => selected => ({ selected }) },
  }))
  .add('default', () => (
    <GuideDetail
      radius={250}
      {...getInteractionProps()}
    />
  ));
