import React from 'react';
import { shallow } from 'enzyme';
import Streamgraph, { roundDateLabel } from '.';
import { conditionCountsByYear } from '../../mockData';

describe('Components|StreamGraph', () => {
  describe('with default props', () => {
    let wrapper;
    let handleOnChange;
    beforeEach(() => {
      wrapper = shallow(<Streamgraph
        projectData={conditionCountsByYear.counts}
        handleOnChange={handleOnChange}
        feature="theme"
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.Streamgraph')).toBe(true);
    });

    test('should render a chart', () => {
      expect(wrapper.find('VictoryChart')).toHaveLength(1);
    });

    test('should render the x and y axis', () => {
      expect(wrapper.find('VictoryAxis')).toHaveLength(2);
    });

    test('should round the date label', () => {
      expect(roundDateLabel(2018.1)).toBe(2018);
    });
  });
});

