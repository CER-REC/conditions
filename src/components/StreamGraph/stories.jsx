import React from 'react';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import StreamGraph from '.';
import ReadMe from './README.md';

import { conditionCountsByYear } from '../../mockData';

storiesForComponent('Components|StreamGraph', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withStyles(`
    .StreamGraph { position: relative; width: 500px; height: 500px }
  `))
  .add('default', () => (
    <StreamGraph
      projectData={conditionCountsByYear.counts}
      feature="phase"
      subFeature=""
    />
  ))
  .add('allThemes', () => (
    <StreamGraph
      projectData={conditionCountsByYear.counts}
      feature="theme"
      subFeature=""
    />
  ))
  .add('subFeature', () => (
    <StreamGraph
      projectData={conditionCountsByYear.counts}
      feature="theme"
      subFeature="SECURITY"
    />
  ))
  .add('streamOnly', () => (
    <StreamGraph
      projectData={conditionCountsByYear.counts}
      feature="theme"
      subFeature=""
      streamOnly
    />
  ));
