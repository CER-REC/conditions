import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

import { conditionData } from '../../mockData';

const defaultProps = {
  data: conditionData,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  companies: [{ id: 1, name: 'Company1' }, { id: 2, name: 'Company2' }],
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
  .addDecorator(withStyles(`
    div.storyWrapper { position: relative; height: 200px; width: 600px; }
  `))
  .add('default', () => (
    <div className="storyWrapper">
      <ConditionDetails
        {...defaultProps}
        {...getInteractionProps()}
      />
    </div>
  ))
  .add('location', () => (
    <div className="storyWrapper">
      <ConditionDetails
        {...defaultProps}
        browseBy="location"
        {...getInteractionProps()}
      />
    </div>
  ))
  .add('expandable', () => (
    <div className="storyWrapper" style={{ width: 800, border: '1px dashed magenta' }}>
      <ConditionDetails
        {...defaultProps}
        isExpandable
        expanded
        {...getInteractionProps()}
      />
    </div>
  ))
  .add('no data loaded', () => (
    <div className="storyWrapper" style={{ width: 800, border: '1px dashed magenta' }}>
      <ConditionDetails
        data={[]}
        selectedProject=""
        searchKeywords={{ include: [], exclude: [] }}
        browseBy="location"
        companies={[{ id: 1, name: 'Company1' }, { id: 2, name: 'Company2' }]}
        openProjectDetails={project => alert(`Project details for: ${project}`)}
        openIntermediatePopup={instrumentNumber => alert(`Intermediate popup for: ${instrumentNumber}`)}
        {...getInteractionProps()}
      />
    </div>
  ));
