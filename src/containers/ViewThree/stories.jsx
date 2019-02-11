import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import FeaturesMenu from '../../components/FeaturesMenu';
import SmallMultiplesLegend from '../../components/SmallMultiplesLegend';
import StreamGraph from '../../components/StreamGraph';
import FeatureDescription from '../../components/FeatureDescription';
import SelectedGroupBar from '../../components/SelectedGroupBar';
import BrowseByButton from '../../components/BrowseByBtn';
import ReadMe from './README.md';
import ViewThree from '.';

const features = ['theme', 'instrument', 'phase', 'type', 'status', 'filing'];

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

const chartTitle = 'Themes Across All Conditions';
const projectData = [
  {
    name: 'themeOne',
    key: 2420,
    color: 'pink',
    graphData: [
      { date: 2010, count: 0 },
      { date: 2011, count: 12 },
      { date: 2012, count: 23 },
      { date: 2013, count: 30 },
      { date: 2014, count: 150 },
      { date: 2015, count: 260 },
      { date: 2016, count: 445 },
      { date: 2017, count: 436 },
    ],
  },
  {
    name: 'themeTwo',
    key: 2420,
    color: 'blue',
    graphData: [
      { date: 2010, count: 11 },
      { date: 2011, count: 23 },
      { date: 2012, count: 34 },
      { date: 2013, count: 41 },
      { date: 2014, count: 77 },
      { date: 2015, count: 82 },
      { date: 2016, count: 99 },
      { date: 2017, count: 120 },
    ],
  },
  {
    name: 'themeThree',
    key: 2420,
    color: 'orange',
    graphData: [
      { date: 2010, count: 14 },
      { date: 2011, count: 30 },
      { date: 2012, count: 46 },
      { date: 2013, count: 65 },
      { date: 2014, count: 83 },
      { date: 2015, count: 95 },
      { date: 2016, count: 140 },
      { date: 2017, count: 11 },
    ],
  },
];

const description = 'components.featureDescription.theme';
const feature = 'theme';

const options = {
  range: true,
  min: 0,
  max: 100,
  step: 5,
};

const boxSizing = [
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>1</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>2</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>3</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>4</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>5</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>6</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>7</span></div>,
];

const components = [
  <FeaturesMenu features={features} onChange={feature => alert(feature)} />,
  <SmallMultiplesLegend
    title="theme"
    data={basicUsageData}
    onChange={name => alert(name)}
  />,
  <StreamGraph
    projectData={projectData}
    chartTitle={chartTitle}
  />,
  <FeatureDescription feature={feature} description={description} />,
  <FeatureDescription feature={feature} description={description} />,
  <div>
    <SelectedGroupBar
      group="components.companyWheel.wheelRay.title"
      groupItem="groupItem"
      groupSize={options}
      groupItemSize={options}
      backgroundColor="lightgrey"
    >
    Company Name
    </SelectedGroupBar>
    <BrowseByButton
      mode="company"
      {...getInteractionProps()}
    />
  </div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>6</span></div>,
];

storiesForView('Containers|ViewThree', module, ReadMe)
  .add('default', () => (
    <ViewThree components={boxSizing} />
  ))
  .add('with components', () => (
    <ViewThree components={components} />
  ));

// * [] The component should contain ConditionsDetails
// * [] The component should contain InstrumentLegend
// * [] The component should contain BubbleChart
// * [] The component should contain FeatureTypeDescription
// * [] The component should contain BrowseByButton
