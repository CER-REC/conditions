import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SmallMultiplesLegend from '.';
import ReadMe from './README.md';

const basicUsageData = [{
  name: 'security',
  graphData: [{
    date: 2018,
    count: 1,
  }, {
    date: 2019,
    count: 30,
  }, {
    date: 2020,
    count: 20,
  }, {
    date: 2021,
    count: 84,
  }, {
    date: 2022,
    count: 3,
  }],
  color: 'red',
}, {
  name: 'managementSystem',
  graphData: [{
    date: 2018,
    count: 43,
  }, {
    date: 2019,
    count: 22,
  }, {
    date: 2020,
    count: 56,
  }, {
    date: 2021,
    count: 1,
  }, {
    date: 2022,
    count: 56,
  }],
  color: 'blue',
}, {
  name: 'financial',
  graphData: [{
    date: 2018,
    count: 5,
  }, {
    date: 2022,
    count: 5,
  }],
  color: 'green',
}, {
  name: 'damagePrevention',
  graphData: [{
    date: 2018,
    count: 46,
  }, {
    date: 2022,
    count: 4,
  }],
  color: 'yellow',
}];
const selectedData = [{
  name: 'includesAll',
  graphData: [{
    date: 2000,
    count: 5,
  }, {
    date: 2001,
    count: 10,
  }],
  color: 'red',
}, {
  name: 'notConstruction',
  graphData: [{
    date: 2000,
    count: 50,
  }, {
    date: 2001,
    count: 25,
  }],
  color: 'green',
}, {
  name: 'postConstruction',
  graphData: [{
    date: 2000,
    count: 38,
  }, {
    date: 2001,
    count: 77,
  }],
  color: 'yellow',
}];
const highlightData = [{
  name: 'nonStandard',
  graphData: [{
    date: 1997,
    count: 123,
  }, {
    date: 1998,
    count: 563,
  }, {
    date: 1999,
    count: 32,
  }],
  color: '#AA11AA',
}, {
  name: 'standard',
  graphData: [{
    date: 1997,
    count: 97,
  }, {
    date: 1999,
    count: 56,
  }],
  color: '#11AA11',
}];
const selectedOptions = selectedData.reduce((hashAggregate, conditionsData) => ({
  ...hashAggregate,
  [conditionsData.name]: conditionsData.name,
}), { All: '' });
const highlightOptions = highlightData.reduce((hashAggregate, conditionsData) => ({
  ...hashAggregate,
  [conditionsData.name]: conditionsData.name,
}), { None: '' });

storiesForComponent('Components|SmallMultiplesLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('basic usage', () => (
    <SmallMultiplesLegend
      title="theme"
      data={basicUsageData}
      onChange={name => alert(name)}
    />
  ))
  .add('selected', () => (
    <SmallMultiplesLegend
      title="phase"
      data={selectedData}
      onChange={name => alert(name)}
      selected={select('Selected', selectedOptions, 'notConstruction')}
    />
  ))
  .add('highlight', () => (
    <SmallMultiplesLegend
      title="type"
      data={highlightData}
      onChange={name => alert(name)}
      highlightName={select('Highlight', highlightOptions, 'standard')}
    />
  ));
