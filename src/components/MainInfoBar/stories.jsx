import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

const setActiveDialog = () => activeDialog => (
  { activeDialog }
);

const toggleExpanded = () => expand => ({ expanded: expand });

const props = {
  pdfUrl: '???',
  openDataModal: () => alert('Download Data window'),
  openScreenshotModal: () => alert('Download Screenshot window'),
};

// eslint-disable-next-line
const Container = ({children}) => (
  <div style={{ width: 700, height: 600 }}>
    {children}
  </div>
);

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setActiveDialog', 'toggleExpanded'] }))
  .add('default', () => (
    <Container>
      <MainInfoBar
        {...props}
        {...getInteractionProps()}
      />
    </Container>
  ),
  {
    interaction: {
      state: { activeDialog: '', expanded: false },
      actions: { setActiveDialog, toggleExpanded },
    },
  })
  .add('About', () => (
    <Container>
      <MainInfoBar
        activeDialog="About"
        {...props}
        {...getInteractionProps()}
      />
    </Container>
  ),
  {
    interaction: {
      state: { activeDialog: 'About', expanded: true },
      actions: { setActiveDialog, toggleExpanded },
    },
  })
  .add('Methodology', () => (
    <Container>
      <MainInfoBar
        activeDialog="Methodology"
        {...props}
        {...getInteractionProps()}
      />
    </Container>
  ),
  {
    interaction: {
      state: { activeDialog: 'Methodology', expanded: true },
      actions: { setActiveDialog, toggleExpanded },
    },
  })
  .add('Downloads', () => (
    <Container>
      <MainInfoBar
        activeDialog="Downloads"
        {...props}
        {...getInteractionProps()}
      />
    </Container>
  ), {
    interaction: {
      state: { activeDialog: 'Downloads', expanded: true },
      actions: { setActiveDialog, toggleExpanded },
    },
  })
  .add('View 1', () => (
    <Container>
      <MainInfoBar
        isView1
        {...props}
        {...getInteractionProps()}
      />
    </Container>
  ), {
    interaction: {
      state: { activeDialog: '', expanded: false },
      actions: { setActiveDialog, toggleExpanded },
    },
  });
