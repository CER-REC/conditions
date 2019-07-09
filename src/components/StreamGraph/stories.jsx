import React from 'react';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import StreamGraph from '.';
import ReadMe from './README.md';

import { conditionCountsByYear, displayOrder } from '../../mockData';

storiesForComponent('Components|StreamGraph', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withStyles(`
    .StreamGraph { position: relative; width: 500px; height: 500px }
  `))
  .add('default', () => (
    <StreamGraph
      allConditionsPerYear={conditionCountsByYear}
      displayOrder={displayOrder}
      feature="phase"
      subFeature=""
    />
  ))
  .add('allThemes', () => (
    <StreamGraph
      allConditionsPerYear={conditionCountsByYear}
      displayOrder={displayOrder}
      feature="theme"
      subFeature=""
    />
  ))
  .add('subFeature', () => (
    <StreamGraph
      allConditionsPerYear={conditionCountsByYear}
      displayOrder={displayOrder}
      feature="theme"
      subFeature="SECURITY"
    />
  ))
  .add('streamOnly', () => (
    <StreamGraph
      allConditionsPerYear={conditionCountsByYear}
      displayOrder={displayOrder}
      feature="theme"
      subFeature=""
      streamOnly
    />
  ));
