import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import StackGroup from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

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
      { date: 2016, count: 420 },
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

const width = 350;
const height = 200;
const yearValues = projectData.reduce((acc, next) => {
  next.graphData.forEach((data) => {
    if (!acc[data.date]) { acc[data.date] = 0; }
    acc[data.date] += data.count;
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

describe('Components|Streamgraph/StackGroup', () => {
  describe('events', () => {
    let wrapper;
    let stackGroup;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(
        <StackGroup
          onChange={spy}
          projectData={projectData}
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
      expect(spy.calledWith(2010)).toBe(true);

      mouseEvent = { ...eventFuncs, clientX: width, clientY: height };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy.calledWith(2017)).toBe(true);

      // This should fall just to the right of the gap between 2010 and 2011
      mouseEvent = { ...eventFuncs, clientX: 25, clientY: 0 };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy.calledWith(2011)).toBe(true);
    });

    test('should not call onChange if mouseMove is fired before mouseDown', () => {
      const mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
      stackGroup.simulate('mouseMove', mouseEvent);
      expect(spy.called).toBe(false);
    });

    test(
      'should call onChange with the correct position when using mouseMove',
      () => {
        let mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
        stackGroup.simulate('mouseDown', mouseEvent);
        expect(spy.calledWith(2010)).toBe(true);

        mouseEvent = { ...eventFuncs, clientX: width, clientY: height };
        stackGroup.simulate('mouseMove', mouseEvent);
        expect(spy.calledWith(2017)).toBe(true);
      },
    );

    test(
      'should call onChange with the first year when the chart is focused',
      () => {
        stackGroup.simulate('focus', eventFuncs);
        expect(spy.calledWith(2010)).toBe(true);
      },
    );

    test(
      'should increase the year if the right arrow is pressed and not at the edge',
      () => {
        const keyEvent = { ...eventFuncs, key: 'ArrowRight' };
        const simulateKeyDownUp = () => {
          stackGroup.simulate('keyDown', keyEvent);
          stackGroup.simulate('keyUp', keyEvent);
        };

        // First time pressing right arrow
        simulateKeyDownUp();
        expect(spy.lastCall.args[0]).toBe(2017);

        wrapper.setProps({ controlYear: 2010 });
        simulateKeyDownUp();
        expect(spy.lastCall.args[0]).toBe(2011);

        // Press right again at the edge, and don't expect it to change
        wrapper.setProps({ controlYear: 2017 });
        simulateKeyDownUp();
        expect(spy.lastCall.args[0]).toBe(2017);
      },
    );

    test(
      'should decrease the year if the left arrow is pressed and not at the edge',
      () => {
        const keyEvent = { ...eventFuncs, key: 'ArrowLeft' };
        const simulateKeyDownUp = () => {
          stackGroup.simulate('keyDown', keyEvent);
          stackGroup.simulate('keyUp', keyEvent);
        };

        // First time pressing right arrow
        simulateKeyDownUp();
        expect(spy.lastCall.args[0]).toBe(2010);

        wrapper.setProps({ controlYear: 2017 });
        simulateKeyDownUp();
        expect(spy.lastCall.args[0]).toBe(2016);

        // Press left again at the edge, and don't expect it to change
        wrapper.setProps({ controlYear: 2010 });
        simulateKeyDownUp();
        expect(spy.lastCall.args[0]).toBe(2010);
      },
    );
  });

  describe('ChartIndicator', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <StackGroup
          onChange={noop}
          projectData={projectData}
          stackProps={stackProps}
        />,
      );
    });

    test('should not be visible when no year is selected', () => {
      expect(wrapper.find('ChartIndicator')).toHaveLength(0);
    });

    test('should position correctly', () => {
      wrapper.setProps({ controlYear: 2010 });
      expect(wrapper.find('ChartIndicator').props()).toMatchObject({
        x: 0,
        yTop: 192.41,
        yBottom: height,
      });

      wrapper.setProps({ controlYear: 2012 });
      expect(wrapper.find('ChartIndicator').props()).toMatchObject({
        x: yearSize * 2,
        yTop: 168.74,
        yBottom: height,
      });

      wrapper.setProps({ controlYear: 2017 });
      expect(wrapper.find('ChartIndicator').props()).toMatchObject({
        x: width,
        yTop: 27.92,
        yBottom: height,
      });
    });

    test('should display a label of the condition count', () => {
      wrapper.setProps({ controlYear: 2013 });
      expect(wrapper.find('ChartIndicator').prop('label')).toBe(136);

      wrapper.setProps({ controlYear: 2015 });
      expect(wrapper.find('ChartIndicator').prop('label')).toBe(437);

      wrapper.setProps({ controlYear: 2016 });
      expect(wrapper.find('ChartIndicator').prop('label')).toBe(659);
    });
  });
});
