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
      countsData={conditionCountsByYear.counts}
      years={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]}
      feature="phase"
      subFeature=""
    />
  ))
  .add('allThemes', () => (
    <StreamGraph
      countsData={conditionCountsByYear.counts}
      years={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]}
      feature="theme"
      subFeature=""
    />
  ))
  .add('subFeature', () => (
    <StreamGraph
      countsData={conditionCountsByYear.counts}
      years={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]}
      feature="theme"
      subFeature="SECURITY"
    />
  ))
  .add('streamOnly', () => (
    <StreamGraph
      countsData={conditionCountsByYear.counts}
      years={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]}
      feature="theme"
      subFeature=""
      streamOnly
    />
  ));
