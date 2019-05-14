import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import Footer from '.';

const noop = () => () => ({});

storiesForView('Containers|Footer', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      setMainInfoBarPane: () => v => ({ mainInfoBarPane: v }),
      openDataModal: noop,
    },
    state: { mainInfoBarPane: '' },
  }))
  .add('default', () => <Footer {...getInteractionProps()} />)
  .add('layout only', () => <Footer {...getInteractionProps()} layoutOnly />);
