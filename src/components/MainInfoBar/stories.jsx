import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

const props = {
  openDataModal: () => alert('Download Data window'),
};

// eslint-disable-next-line
const StoryContainer = ({children}) => (
  <div style={{ width: 700, height: 600 }}>
    {children}
  </div>
);

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setPane'] }))
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
      state: { pane: '' },
      actions: {
        setPane: () => pane => ({ pane }),
      },
    },
  })
  .add('About', () => (
    <StoryContainer>
      <MainInfoBar
        pane="about"
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ))
  .add('Methodology', () => (
    <StoryContainer>
      <MainInfoBar
        pane="methodology"
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ))
  .add('Download', () => (
    <StoryContainer>
      <MainInfoBar
        pane="download"
        {...props}
        {...getInteractionProps()}
      />
    </StoryContainer>
  ));
