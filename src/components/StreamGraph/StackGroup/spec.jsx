import React from 'react';
import { shallow } from 'enzyme';

import StackGroup from '.';
import { conditionCountsByYear } from '../../../mockData';
import getFilteredProjectData from '../../../utilities/getFilteredProjectData';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const width = 350;
const height = 200;
const feature = 'theme';
const filteredData = getFilteredProjectData(conditionCountsByYear.counts, feature);
const yearValues = filteredData.reduce((acc, next) => {
  Object.entries(next.years).forEach(([date, count]) => {
    if (!acc[date]) { acc[date] = 0; }
    acc[date] += count;
  });
  return acc;
}, {});
const years = Object.keys(yearValues);
const values = Object.values(yearValues);
const domain = {
  x: [Math.min(...years), Math.max(...years)],
  y: [Math.min(...values), Math.max(...values)],
};
const yearSize = width / (domain.x[1] - domain.x[0]);

const stackProps = {
  domain: { x: domain.x },
  scale: {
    x: val => (val - domain.x[0]) * yearSize,
    y: val => Math.round((height - (val / (domain.y[1] / height))) * 100) / 100,
  },
  // eslint-disable-next-line object-curly-newline
  padding: { left: 0, right: 0, top: 0, bottom: 0 },
  width,
  height,
};

describe('Components|StreamGraph/StackGroup', () => {
  describe('events', () => {
    let wrapper;
    let stackGroup;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <StackGroup
          onChange={spy}
          countsData={conditionCountsByYear.counts}
          stackProps={stackProps}
        />,
      );
      stackGroup = wrapper.find('.StackGroup');
    });

    test('should call onChange with the correct position when clicking', () => {
      // Simulate mouseDown and mouseUp since Enzyme would call `onClick` which
      // isn't used.
      let mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2010);

      mouseEvent = { ...eventFuncs, clientX: width, clientY: height };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2017);

      // This should fall just to the right of the gap between 2010 and 2011
      mouseEvent = { ...eventFuncs, clientX: 25, clientY: 0 };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2011);
    });

    test('should not call onChange if mouseMove is fired before mouseDown', () => {
      const mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
      stackGroup.simulate('mouseMove', mouseEvent);
      expect(spy).not.toHaveBeenCalled();
    });

    test('should call onChange with the correct position when using mouseMove', () => {
      let mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
      stackGroup.simulate('mouseDown', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2010);

      mouseEvent = { ...eventFuncs, clientX: width, clientY: height };
      stackGroup.simulate('mouseMove', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2017);
    });

    test('should call onChange with the first year when the chart is focused', () => {
      stackGroup.simulate('focus', eventFuncs);
      expect(spy).toHaveBeenLastCalledWith(2010);
    });

    test('should increase the year if the right arrow is pressed and not at the edge', () => {
      const keyEvent = { ...eventFuncs, key: 'ArrowRight' };
      const simulateKeyDownUp = () => {
        stackGroup.simulate('keyDown', keyEvent);
        stackGroup.simulate('keyUp', keyEvent);
      };

      // First time pressing right arrow
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2017);

      wrapper.setProps({ controlYear: 2010 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2011);

      // Press right again at the edge, and don't expect it to change
      wrapper.setProps({ controlYear: 2017 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2017);
    });

    test('should decrease the year if the left arrow is pressed and not at the edge', () => {
      const keyEvent = { ...eventFuncs, key: 'ArrowLeft' };
      const simulateKeyDownUp = () => {
        stackGroup.simulate('keyDown', keyEvent);
        stackGroup.simulate('keyUp', keyEvent);
      };

      // First time pressing right arrow
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2010);

      wrapper.setProps({ controlYear: 2017 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2016);

      // Press left again at the edge, and don't expect it to change
      wrapper.setProps({ controlYear: 2010 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2010);
    });
  });
});
