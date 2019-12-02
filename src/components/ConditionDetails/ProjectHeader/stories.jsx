import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectHeader from '.';
import ReadMe from './README.md';

const toggleExpanded = () => expand => ({ expanded: expand });

const defaultProps = {
  selectedProject: 'Keystone XL',
  openProjectDetails: () => alert('Project details'),
  companies: [{ id: 1, name: 'Company1' }, { id: 2, name: 'Company2' }],
};

storiesForComponent('Components|ConditionDetails/ProjectHeader', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['toggleExpanded'] }))
  .add('expandable', () => (
    <ProjectHeader
      isExpandable
      {...getInteractionProps()}
      {...defaultProps}
    />
  ), { interaction: { state: { expanded: true }, actions: { toggleExpanded } } })
  .add('location mode', () => (
    <ProjectHeader
      browseBy="location"
      {...defaultProps}
      {...getInteractionProps()}
    />
  ))
  .add('not expandable', () => (
    <ProjectHeader
      {...defaultProps}
      {...getInteractionProps()}
    />
  ));
