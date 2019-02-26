import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

import data from './testData';

const updateSelectedItem = () => (instrumentIndex, itemIndex) => (
  { selectedItem: { instrumentIndex, itemIndex } }
);

const toggleExpanded = () => expand => ({ expanded: expand });

const defaultProps = {
  data,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  // selectedItem: { instrumentIndex: 1, itemIndex: -1 },
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
  .add('expandable', () => (
    <ConditionDetails
      {...defaultProps}
      // selectedItem={{ instrumentIndex: 1, itemIndex: 0 }}
      isExpandable
      expanded
      {...getInteractionProps()}
    />
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
