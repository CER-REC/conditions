import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

const setActiveDialog = () => activeDialog => (
  { activeDialog }
);

// eslint-disable-next-line
const Container = ({children}) => (
  <div style={{ width: 700, height: 600 }}>
    {children}
  </div>
);

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setActiveDialog'] }))
  .add('default', () => (<Container><MainInfoBar {...getInteractionProps()} /></Container>),
    {
      interaction: {
        state: { activeDialog: '' },
        actions: { setActiveDialog },
      },
    })
  .add('About', () => (<Container><MainInfoBar activeDialog="About" {...getInteractionProps()} /></Container>),
    {
      interaction: {
        state: { activeDialog: 'About' },
        actions: { setActiveDialog },
      },
    })
  .add('Methodology', () => (<Container><MainInfoBar activeDialog="Methodology" {...getInteractionProps()} /></Container>),
    {
      interaction: {
        state: { activeDialog: 'Methodology' },
        actions: { setActiveDialog },
      },
    })
  .add('Downloads', () => (<Container><MainInfoBar activeDialog="Downloads" {...getInteractionProps()} /></Container>),
    {
      interaction: {
        state: { activeDialog: 'Downloads' },
        actions: { setActiveDialog },
      },
    })
  .add('View 1', () => (<Container><MainInfoBar isView1 {...getInteractionProps()} /></Container>),
    {
      interaction: {
        state: { activeDialog: '' },
        actions: { setActiveDialog },
      },
    });
