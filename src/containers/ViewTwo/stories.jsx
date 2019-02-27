import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewTwo from '.';

storiesForView('Containers|ViewTwo', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      setBrowseBy: () => browseBy => ({ browseBy }),
      selectRay: () => () => ({}),
    },
    state: { browseBy: 'company' },
  }))
  .add('default', () => <ViewTwo {...getInteractionProps()} />)
  .add('layout only', () => <ViewTwo layoutOnly {...getInteractionProps()} />);
