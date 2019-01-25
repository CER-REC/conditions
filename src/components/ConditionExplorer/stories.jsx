import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ConditionExplorer from '.';
import PhysicsTest from './PhysicsTest';
import ReadMe from './README.md';
import keywords from './mockKeywords';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

storiesForComponent('Components|ConditionExplorer', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['changeVisibleWords'] }))
  .add('default', () => (
    <ConditionExplorer keywords={uniqueKeywords} {...getInteractionProps()} />
  ))
  .add('physics', () => <PhysicsTest />);
