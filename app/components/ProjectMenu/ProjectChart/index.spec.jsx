import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectChart from './';

const chartData = [
  { name: 'Integrity Management', count: 34, color: 'pink' },
  { name: 'Sunset Clause', count: 2, color: 'blue' },
  { name: 'Financial', count: 14, color: 'moccasin' },
  { name: 'Management System', count: 4, color: 'forestgreen' },
  { name: 'No Theme Indicated', count: 5, color: 'black' },
  { name: 'Security', count: 79, color: 'tomato' },
  { name: 'Enforcement', count: 66, color: 'lightblue' },
  { name: 'Administrative', count: 9, color: 'limegreen' },
  { name: 'Environmental Protection', count: 34, color: 'green' },
  { name: 'Socio-Economic', count: 127, color: 'lavender' },
  { name: 'Standard Condition', count: 15, color: 'brown' },
  { name: 'Safety Management', count: 0, color: 'midnightblue' },
  { name: 'Emergency Management', count: 0, color: 'teal' },
  { name: 'Damage Prevention', count: 0, color: 'purple' },
];

const chartType = 'Theme';
const projectName = 'Project Name';

describe('Components|ProjectMenu/ProjectChart', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectChart
        chartType={chartType}
        graphData={chartData}
        projectName={projectName}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a ProjectChart class', () => {
      expect(wrapper.is('div.ProjectChart')).to.equal(true);
    });
  });

  describe('when Theme is the selected feature', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectChart
        chartType={chartType}
        graphData={chartData}
        projectName={projectName}
      />);
    });

    it('should render 14 FeatureFlags', () => {
      expect(wrapper.find('FeatureFlag')).to.have.a.lengthOf(14);
    });
  });

  describe('when the chart is selected', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectChart
        chartType={chartType}
        graphData={chartData}
        projectName={projectName}
        selected
      />);
    });
    it('should add the className "selected"', () => {
      expect(wrapper.is('div.selected')).to.equal(true);
    });
  });
});
