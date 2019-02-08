import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import Tab from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/Tab', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: {
      isActive: true,
    },
    actions: {
      onClick: state => () => ((state.isActive)
        ? ({ isActive: false })
        : ({ isActive: true })),
    },
  }))
  .add('SearchTab', () => (
    <Tab
      {...getInteractionProps()}
      isFilter={false}
    />
  ))
  .add('FilterTab', () => (
    <Tab
      {...getInteractionProps()}
      isFilter
    />
  ));
