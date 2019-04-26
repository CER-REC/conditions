import React from 'react';
import { shallow } from 'enzyme';
import StreamGraph from '.';
import { conditionCountsByYear } from '../../mockData';

describe('Components|StreamGraph', () => {
  describe('with default props', () => {
    let wrapper;
    let handleOnChange;
    beforeEach(() => {
      wrapper = shallow(<StreamGraph
        projectData={conditionCountsByYear.counts}
        handleOnChange={handleOnChange}
        feature="theme"
        subFeature=""
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.StreamGraph')).toBe(true);
    });

    test('should render a chart', () => {
      expect(wrapper.find('VictoryChart')).toHaveLength(1);
    });

    test('should render the x and y axis', () => {
      expect(wrapper.find('VictoryAxis')).toHaveLength(2);
    });
  });
});
