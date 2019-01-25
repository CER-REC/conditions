import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';
import Grid from '.';
import ReadMe from './README.md';

storiesForComponent('Components|Grid', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onChange', 'someInteractionPropFunc'] }))
  .add('default', () => (
    <Grid {...getInteractionProps()}>
      <Icon icon="angle-right" color="blue" size="6x" />
      <Icon icon="angle-right" color="green" size="3x" />
      <CircleContainer size="60px">&nbsp;</CircleContainer>
      <CircleContainer size="24px" elevated>&nbsp;</CircleContainer>
    </Grid>
  ), {
    state: { selected: 3, otherPropExample: false },
    actions: {
      onChange: () => v => ({ selected: v }),
      someInteractionPropFunc: state => () => ({ otherPropExample: !state.otherPropExample }),
    },
  });

