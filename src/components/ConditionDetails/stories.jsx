import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

import { conditionData } from '../../mockData';

const defaultProps = {
  data: conditionData,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  openProjectDetails: project => alert(`Project details for: ${project}`),
  openIntermediatePopup: instrumentNumber => alert(`Intermediate popup for: ${instrumentNumber}`),
};

storiesForComponent('Components|ConditionDetails', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      updateSelectedCondition: () => () => ({}),
      updateSelectedInstrument: () => () => ({}),
      toggleExpanded: () => expand => ({ expanded: expand }),
    },
  }))
  .add('default', () => (
    <ConditionDetails
      {...defaultProps}
      {...getInteractionProps()}
    />
  ))
  .add('location', () => (
    <ConditionDetails
      {...defaultProps}
      browseBy="location"
      {...getInteractionProps()}
    />
  ))
  .add('expandable', () => (
    <div style={{ width: 800, border: '1px dashed magenta' }}>
      <ConditionDetails
        {...defaultProps}
        isExpandable
        expanded
        {...getInteractionProps()}
      />
    </div>
  ))
  .add('no data loaded', () => (
    <div style={{ width: 800, border: '1px dashed magenta' }}>
      <ConditionDetails
        data={[]}
        selectedProject=""
        searchKeywords={{ include: [], exclude: [] }}
        browseBy="location"
        openProjectDetails={project => alert(`Project details for: ${project}`)}
        openIntermediatePopup={instrumentNumber => alert(`Intermediate popup for: ${instrumentNumber}`)}
        {...getInteractionProps()}
      />
    </div>
  ));
