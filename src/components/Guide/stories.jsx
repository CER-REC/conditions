import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import Guide from '.';

import ReadMe from './README.md';

const noop = () => {};

storiesForComponent('Components|Guide', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => <Guide step={select('Step', [0, 1, 2, 3, 4, 5, 6, 7], 6)} onClick={noop} />);
