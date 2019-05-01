import React from 'react';
import { shallow } from 'enzyme';
// Imported instead of using string lookup because of InjectIntl
import FeatureFlag from '../../FeatureFlag';

import ProjectChart from '.';

const chartData = [
  { name: 'INTEGRITY_MANAGEMENT', count: 34 },
  { name: 'SUNSET_CLAUSE', count: 2 },
  { name: 'FINANCIAL', count: 14 },
  { name: 'MANAGEMENT SYSTEM', count: 4 },
  { name: 'NO_THEME_INDICATED', count: 5 },
  { name: 'SECURITY', count: 79 },
  { name: 'ENFORCEMENT', count: 66 },
  { name: 'ADMINISTRATIVE', count: 9 },
  { name: 'ENVIRONMENTAL PROTECTION', count: 34 },
  { name: 'SOCIO_ECONOMIC', count: 127 },
  { name: 'STANDARD_CONDITION', count: 15 },
  { name: 'SAFETY_MANAGEMENT', count: 0 },
  { name: 'EMERGENCY_MANAGEMENT', count: 0 },
  { name: 'DAMAGE_PREVENTION', count: 0 },
];

const chartType = 'Theme';
const projectName = '3. Section 21.(1) application';

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

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a ProjectChart class', () => {
      expect(wrapper.is('div.ProjectChart')).toBe(true);
    });
  });

  describe('with loading data', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectChart
        chartType={chartType}
        graphData={chartData}
        projectName={projectName}
        loading
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a loading class', () => {
      expect(wrapper.hasClass('loading')).toBe(true);
    });

    test('should not display a condition count', () => {
      expect(wrapper.find('CircleContainer').props().children).toEqual('');
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

    test('should render 14 FeatureFlags', () => {
      expect(wrapper.find(FeatureFlag)).toHaveLength(14);
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

    test('should add the className "selected"', () => {
      expect(wrapper.is('div.selected')).toBe(true);
    });

    test('should remove the project name', () => {
      const project = wrapper.find('div.ProjectName');
      expect(project.contains('<p>')).toBe(false);
    });
  });

  describe('when there is missing data', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectChart
        chartType={chartType}
        graphData={[]}
      />);
    });
    test('should only render a ConditionPipe', () => {
      expect(wrapper.find('div.ConditionPipe')).toHaveLength(1);
      expect(wrapper.find('FlagWrapper')).toHaveLength(0);
      expect(wrapper.find('ProjectName')).toHaveLength(0);
    });
  });
});
