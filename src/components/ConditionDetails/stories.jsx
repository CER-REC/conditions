import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

import { conditionData } from '../../mockData';

const updateSelectedItem = () => ({ instrumentIndex, itemIndex }) => (
  { selectedItem: { instrumentIndex, itemIndex } }
);

const toggleExpanded = () => expand => ({ expanded: expand });

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
  .addDecorator(withInteraction({ actions: ['updateSelectedItem', 'toggleExpanded'] }))
  .add('default', () => (
    <ConditionDetails
      {...defaultProps}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        selectedItem: {
          instrumentIndex: 1,
          itemIndex: -1,
        },
      },
      actions: {
        toggleExpanded,
        updateSelectedItem,
      },
    },
  })
  .add('location', () => (
    <ConditionDetails
      {...defaultProps}
      browseBy="location"
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        selectedItem: {
          instrumentIndex: 1,
          itemIndex: -1,
        },
      },
      actions: {
        toggleExpanded,
        updateSelectedItem,
      },
    },
  })
  .add('expandable', () => (
    <div style={{ width: 800, border: '1px dashed magenta' }}>
      <ConditionDetails
        {...defaultProps}
        isExpandable
        expanded
        {...getInteractionProps()}
      />
    </div>
  ), {
    interaction: {
      state: {
        selectedItem: {
          instrumentIndex: 1,
          itemIndex: 1,
        },
      },
      actions: {
        toggleExpanded,
        updateSelectedItem,
      },
    },
  });
