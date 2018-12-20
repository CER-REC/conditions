import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BubbleChart from '.';

const noop = () => {};
const bubbleChartData = {
  name: 'data',
  children: [{
    parentName: 'GAS',
    children: [
      {
        name: 'XG',
        children: [],
      }, {
        name: 'GC',
        children: [],
        value: 50,
      },
      {
        name: 'GPSO',
        children: [],
        value: 25,
      },
      {
        name: 'SG',
        children: [],
        value: 40,
      },
      {
        name: 'GPLO',
        children: [],
        value: 50,
      }],
  },
  {
    parentName: 'POWER',
    children: [
      {
        name: 'EC',
        children: [],
        value: 50,
      },
      {
        name: 'EPE',
        children: [],
        value: 25,
      },
    ],
  },
  {
    parentName: 'OIL',
    children: [{
      name: 'XO',
      children: [],
      value: 25,
    },
    {
      name: 'SO',
      children: [],
      value: 50,
    }, {
      name: 'OC',
      children: [],
      value: 75,
    }, {
      name: 'OPL',
      children: [],
      value: 25,
    }, {
      name: 'OPLO',
      children: [],
      value: 25,
    }, {
      name: 'OPSO',
      children: [],
      value: 25,
    }],
  }],
};

describe('Components|BubbleChart', () => {
  describe('without a selectedCategory equal to Instrument', () => {
    it('should not render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="test" bubbleChartData={bubbleChartData} />);
      expect(wrapper.type()).to.equal(null);
    });
  });
  describe('with a selectedCategory', () => {
    it('should render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" bubbleChartData={bubbleChartData} />);
      expect(wrapper.type()).to.equal('div');
    });

    it('should render a bubbleChart class', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" onChange={noop} bubbleChartData={bubbleChartData} />);
      expect(wrapper.find('.BubbleChart')).to.have.lengthOf(1);
    });
  });
});
