import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ConditionExplorer from '.';
import ReadMe from './README.md';
import keywords from './mockKeywords';
import InformationPanel from './PhysicsVariant/InformationPanel';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const options = {
  range: true,
  min: 0,
  max: 4,
  step: 1,
};

storiesForComponent('Components|ConditionExplorer', module, ReadMe)
  .addDecorator(withKnobs)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['changeVisibleWords'] }))
  .add('default', () => (
    <ConditionExplorer
      keywords={uniqueKeywords}
      {...getInteractionProps()}
    />
  ))
  .add('physics disabled', () => (
    <ConditionExplorer
      keywords={uniqueKeywords}
      physics={false}
      {...getInteractionProps()}
    />
  ))
  .add('information panel', () => (
    <InformationPanel selected={number('Element', 0, options)} />
  ));
