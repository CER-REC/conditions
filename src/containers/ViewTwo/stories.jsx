import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewTwoUnconnected } from '.';

storiesForView('Containers|ViewTwo', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      setBrowseBy: () => browseBy => ({ browseBy }),
      setSelectedFeature: ({ selected }) => feature => ({ selected: { ...selected, feature } }),
    },
    state: {
      browseBy: 'company',
      selected: {
        feature: 'theme',
      },
    },
  }))
  .add('default', () => <ViewTwoUnconnected {...getInteractionProps()} />)
  .add('layout only', () => <ViewTwoUnconnected layoutOnly {...getInteractionProps()} />);
