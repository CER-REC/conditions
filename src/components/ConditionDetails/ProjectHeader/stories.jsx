import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectHeader from '.';
import ReadMe from './README.md';

const toggleExpanded = () => expand => ({ expanded: expand });

storiesForComponent('Components|ConditionDetails/ProjectHeader', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['toggleExpanded'] }))
  .add('expandable', () => (
    <ProjectHeader
      isExpandable
      selectedProject="Keystone XL"
      openProjectDetails={() => alert('Project details')}
      {...getInteractionProps()}
    />
  ), { interaction: { actions: { toggleExpanded } } })
  .add('not expandable', () => (
    <ProjectHeader
      selectedProject="Keystone XL"
      openProjectDetails={() => alert('Project details')}
      {...getInteractionProps()}
    />
  ));
