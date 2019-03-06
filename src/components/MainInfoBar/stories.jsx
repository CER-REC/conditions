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
  openDataModal: () => alert('Download Data window'),
  openScreenshotModal: () => alert('Download Screenshot window'),
};

// eslint-disable-next-line
const StoryContainer = ({children}) => (
  <div style={{ width: 700, height: 600 }}>
    {children}
  </div>
);

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setActiveDialog', 'toggleExpanded'] }))
  .add('with interaction', () => (
    <StoryContainer>
      <MainInfoBar
        activeDialog="about"
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ),
  {
    interaction: {
      state: { activeDialog: '', expanded: false },
      actions: { setActiveDialog, toggleExpanded },
    },
  })
  .add('About', () => (
    <StoryContainer>
      <MainInfoBar
        activeDialog="about"
        expanded
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ))
  .add('Methodology', () => (
    <StoryContainer>
      <MainInfoBar
        activeDialog="methodology"
        expanded
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ))
  .add('Downloads', () => (
    <StoryContainer>
      <MainInfoBar
        activeDialog="downloads"
        expanded
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ));
