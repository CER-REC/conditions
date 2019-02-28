import React from 'react';
import { shallow } from 'enzyme';
import BubbleChart from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const instrumentChartData = [
  {
    prefix: 'XO',
    value: 40,
    type: 'ROUTING',
    commodity: ['OIL'],
  },
  {
    prefix: 'OPL',
    value: 10,
    type: 'ROUTING',
    commodity: ['GAS'],
  },
  {
    prefix: 'EC',
    value: 21,
    type: 'CONSTRUCTION',
    commodity: ['OIL', 'GAS', 'POWER'],
  },
  {
    prefix: 'EPE',
    value: 7,
    type: 'CONSTRUCTION',
    commodity: ['POWER'],
  },
  {
    prefix: 'GPSO',
    value: 10,
    type: 'OPENING',
    commodity: ['OIL', 'GAS'],
  },
  {
    prefix: 'GPLO',
    value: 40,
    type: 'OPENING',
    commodity: ['GAS', 'OIL'],
  },
  {
    prefix: 'OPLO',
    value: 20,
    type: 'OPENING',
    commodity: ['OIL'],
  },
  {
    prefix: 'OPSO',
    value: 33,
    type: 'OPENING',
    commodity: ['OIL'],
  },
  {
    prefix: 'MO',
    value: 5,
    type: 'MISC',
    commodity: ['NOT_SPECIFIED'],
  },
  {
    prefix: 'AO',
    value: 15,
    type: 'MISC',
    commodity: ['NOT_SPECIFIED'],
  },
];

describe('Components|BubbleChart', () => {
  let wrapper;
  let spy;
  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow(<BubbleChart
      indicator=""
      setIndicator={spy}
      data={instrumentChartData}
    />);
  });

  shouldBehaveLikeAComponent(BubbleChart, () => wrapper);
  describe('with indicator', () => {
    test('should not show ChartIndicator if not set', () => {
      expect(wrapper.find('ChartIndicator')).toHaveLength(0);
    });

    test('should show the ChartIndicator when set', () => {
      wrapper.setProps({ indicator: 'AO' });
      expect(wrapper.find('ChartIndicator')).toHaveLength(1);
      const indicatorPropsAO = wrapper.find('ChartIndicator').props();
      wrapper.setProps({ indicator: 'OPL' });
      expect(wrapper.find('ChartIndicator').props()).not.toEqual(indicatorPropsAO);
    });
  });

  describe('onClick ', () => {
    test('should change the indicator position', () => {
      wrapper.find('InstrumentBubble').prop('onClick')('AO');
      expect(spy).toHaveBeenLastCalledWith('AO');
    });
  });

  describe('onKeyPress', () => {
    const arrowRight = { key: 'ArrowRight' };
    const arrowLeft = { key: 'ArrowLeft' };
    const keyCodeRight = { keyCode: 39 };
    const keyCodeLeft = { keyCode: 37 };

    let keyPress;
    beforeEach(() => {
      keyPress = wrapper.find('InstrumentBubble').prop('keyPress');
    });

    test('right should wrap around beginning', () => {
      // Test key and keycode with no indicator set first
      keyPress(arrowRight);
      expect(spy).toHaveBeenLastCalledWith('OIL');
      expect(spy).toHaveBeenCalledTimes(1);
      keyPress(keyCodeRight);
      expect(spy).toHaveBeenLastCalledWith('OIL');
      expect(spy).toHaveBeenCalledTimes(2);
      // Set the indicator to the beginning and test wrapping
      wrapper.setProps({ indicator: 'MO' });
      keyPress(arrowRight);
      expect(spy).toHaveBeenLastCalledWith('OIL');
      expect(spy).toHaveBeenCalledTimes(3);
    });

    test('left should wrap around end', () => {
      // Test key and keycode with no indicator set first
      keyPress(arrowLeft);
      expect(spy).toHaveBeenLastCalledWith('MO');
      expect(spy).toHaveBeenCalledTimes(1);
      keyPress(keyCodeLeft);
      expect(spy).toHaveBeenLastCalledWith('MO');
      expect(spy).toHaveBeenCalledTimes(2);
      // Set the indicator to the beginning and test wrapping
      wrapper.setProps({ indicator: 'OIL' });
      keyPress(arrowLeft);
      expect(spy).toHaveBeenLastCalledWith('MO');
      expect(spy).toHaveBeenCalledTimes(3);
    });

    test('left and right with current indicator should move once', () => {
      wrapper.setProps({ indicator: 'GAS' });
      keyPress(arrowRight);
      expect(spy).toHaveBeenLastCalledWith('POWER');
      keyPress(arrowLeft);
      expect(spy).toHaveBeenLastCalledWith('OIL');
    });
  });

  describe('onDrag', () => {
    const onMouseOverEvent = { target: { dataset: { name: 'GAS' } } };
    test('should not update indicator position if mouseOver without mouseDown', () => {
      wrapper.find('g').prop('onMouseOver')(onMouseOverEvent);
      expect(spy).not.toHaveBeenCalled();
    });

    test('should update indicator position if mouseOver with mouseDown but not mouseUp', () => {
      wrapper.find('g').prop('onMouseDown')();
      wrapper.find('g').prop('onMouseOver')(onMouseOverEvent);
      expect(spy).toHaveBeenLastCalledWith('GAS');
      wrapper.find('g').prop('onMouseUp')();
      wrapper.find('g').prop('onMouseOver')(onMouseOverEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
