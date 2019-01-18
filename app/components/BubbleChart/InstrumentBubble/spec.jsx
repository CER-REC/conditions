import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import InstrumentBubble from '.';
import d3HierarchyCalculation from '../../../utilities/d3HierarchyCalculation';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const instrumentChartData = {
  name: 'data',
  children: [{
    parentName: 'GAS',
    children: [
      {
        name: 'XG',
        children: [],
        value: 40,
        category: 'construction',
      }, {
        name: 'GC',
        children: [],
        value: 30,
        category: 'construction',
      },
      {
        name: 'GPSO',
        children: [],
        value: 10,
        category: 'opening',
      },
      {
        name: 'SG',
        children: [],
        value: 20,
        category: 'safety',
      },
      {
        name: 'GPLO',
        children: [],
        value: 5,
        category: 'opening',
      },
      {
        name: 'TG',
        children: [],
        value: 10,
        category: 'tariffs',
      },
    ],
  },
  {
    parentName: 'POWER',
    children: [
      {
        name: 'EC',
        children: [],
        value: 10,
        category: 'construction',
      },
      {
        name: 'EPE',
        children: [],
        value: 15,
        category: 'construction',
      }, {
        // Extra Test Data added for testing currently missing categories.
        name: '1',
        children: [],
        value: 15,
        category: 'routing',
      }, {
        name: '2',
        children: [],
        value: 10,
        category: 'abandonment',
      }, {
        name: '3',
        children: [],
        value: 10,
        category: 'misc',
      }, {
        name: '4',
        children: [],
        value: 10,
        category: null,
      },
    ],
  },
  {
    parentName: 'OIL',
    children: [{
      name: 'XO',
      children: [],
      value: 40,
      category: 'construction',
    },
    {
      name: 'SO',
      children: [],
      value: 30,
      category: 'safety',
    }, {
      name: 'OC',
      children: [],
      value: 40,
      category: 'construction',
    }, {
      name: 'OPLO',
      children: [],
      value: 10,
      category: 'opening',
    }, {
      name: 'OPSO',
      children: [],
      value: 10,
      category: 'opening',
    }],
  }],
};

describe('Components|BubbleChart/InstrumentBubble', () => {
  describe('when rendered InstrumentBubble', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <InstrumentBubble
          width={550}
          height={400}
          onClick={noop}
          keyPress={noop}
          d3HierarchyCalculation={d3HierarchyCalculation(
            instrumentChartData,
            550,
            400,
          )}
        />,
      );
    });
    it('should render atleast one circle', () => {
      expect((wrapper).find('circle').exists()).to.equal(true);
    });
  });

  describe('when a circle is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(
        <InstrumentBubble
          width={550}
          height={400}
          onClick={spy}
          keyPress={spy}
          d3HierarchyCalculation={d3HierarchyCalculation(
            instrumentChartData,
            550,
            400,
          )}
        />,
      );
    });
    it("should call it's onClick prop", () => {
      wrapper.find('circle').first().simulate('click', eventFuncs);
      expect(spy.called).to.equal(true);
    });

    it("should call it's onClick prop when enter is pressed", () => {
      wrapper.find('circle').first().simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy.called).to.equal(true);
    });
  });
});
