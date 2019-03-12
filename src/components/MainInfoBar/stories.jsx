import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

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
  .addDecorator(withInteraction({ actions: ['setActiveDialog'] }))
  .add('with interaction', () => (
    <StoryContainer>
      <MainInfoBar
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ),
  {
    interaction: {
      state: { activeDialog: '' },
      actions: {
        setActiveDialog: () => activeDialog => ({ activeDialog }),
      },
    },
  })
  .add('About', () => (
    <StoryContainer>
      <MainInfoBar
        activeDialog="about"
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ))
  .add('Methodology', () => (
    <StoryContainer>
      <MainInfoBar
        activeDialog="methodology"
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ))
  .add('Downloads', () => (
    <StoryContainer>
      <MainInfoBar
        activeDialog="downloads"
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ));
