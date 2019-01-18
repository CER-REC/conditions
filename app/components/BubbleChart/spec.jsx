import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BubbleChart from '.';

const instrumentChartData2 = {
  name: 'data',
  children: [{
    parentName: 'anyCommodityTypes',
    children: [
      {
        name: 'MO',
        children: [],
        value: 40,
        category: 'misc',
      }, {
        name: 'AO',
        children: [],
        value: 40,
        category: 'misc',
      },
      {
        name: 'ZO',
        children: [],
        value: 20,
        category: 'routing',
      },
    ],
  },
  {
    parentName: 'notSpecified',
    children: [
      {
        name: 'XC',
        children: [],
        value: 10,
        category: 'construction',
      },
      {
        name: 'CO',
        children: [],
        value: 10,
        category: 'misc',
      },
    ],
  }],
};

const instrumentChartData1 = {
  name: 'data',
  children: [{
    parentName: 'gas',
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
    parentName: 'power',
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
      },
    ],
  },
  {
    parentName: 'oil',
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

describe('Components|BubbleChart', () => {
  describe('without a selectedCategory equal to Instrument', () => {
    it('should not render a div', () => {
      const wrapper = shallow(<BubbleChart
        selectedCategory="test"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
      expect(wrapper.type()).to.equal(null);
    });
  });
  describe('with a selectedCategory', () => {
    it('should render a div', () => {
      const wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
      expect(wrapper.type()).to.equal('div');
    });

    it('should render a bubbleChart class', () => {
      const wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
      expect(wrapper.find('.BubbleChart')).to.have.lengthOf(1);
    });
  });

  describe('with chartIndicator display prop ', () => {
    it('should not show chartIndicator when false', () => {
      const wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
      expect(wrapper.find('ChartIndicator')).to.have.lengthOf(0);
    });
    it('should show the chartIndicator when true', () => {
      const wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
      wrapper.setState({ display: true });
      expect(wrapper.find('ChartIndicator')).to.have.lengthOf(1);
    });
  });

  describe('onClick ', () => {
    it('should change the indicator position', () => {
      const circleProps = {
        r: 20,
        x: 30,
        y: 40,
        value: 25,
        name: 'commodity',
      };
      const wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
      wrapper.find('InstrumentBubble').first().props().onClick(circleProps);
      expect(wrapper.state().indicatorX).to.equal(30);
      expect(wrapper.state().indicatorYBottom).to.equal(20);
    });
  });
});
