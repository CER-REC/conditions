import React from 'react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SelectedGroupBar from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: 0,
  max: 100,
  step: 5,
};

const colourOptions = ['tomato', 'blue', 'green', 'pink'];

storiesForComponent('Components|SelectedGroupBar', module, ReadMe)
  .addDecorator(withKnobs)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <SelectedGroupBar
      group="components.companyWheel.wheelRay.title"
      groupItem="groupItem"
      groupSize={number('Group Size', 16, options)}
      groupItemSize={number('Group Item Size', 14, options)}
      backgroundColor={select('Colour Options', colourOptions, 'tomato')}
    >
    condition
    </SelectedGroupBar>
  ));
