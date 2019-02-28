import React from 'react';
import { shallow } from 'enzyme';
import InstrumentBubble from '.';
import d3HierarchyCalculation from '../d3HierarchyCalculation';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

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

describe('Components|BubbleChart/InstrumentBubble', () => {
  xdescribe('when rendered InstrumentBubble', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <InstrumentBubble
          onClick={noop}
          keyPress={noop}
          d3Calculation={d3HierarchyCalculation(
            instrumentChartData,
            550,
            400,
          )}
        />,
      );
    });
    test('should render atleast one circle', () => {
      expect((wrapper).find('circle').exists()).toBe(true);
    });
  });

  xdescribe('when a circle is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <InstrumentBubble
          onClick={spy}
          keyPress={spy}
          d3Calculation={d3HierarchyCalculation(
            instrumentChartData,
            550,
            400,
          )}
        />,
      );
    });
    test("should call it's onClick prop", () => {
      wrapper.find('circle').first().parent().simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalled();
    });

    test("should call it's onClick prop when enter is pressed", () => {
      wrapper.find('circle').first().parent().simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy).toHaveBeenCalled();
    });
  });
});
