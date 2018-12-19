import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import InstrumentBubble from './';


const instrumentChartData = {
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
    ]
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

describe('Components|BubbleChart/InstrumentBubble', () => {
  describe('when rendered InstrumentBubble', () => {
    it('should render a div', () => {
      const wrapper = shallow(<InstrumentBubble instrumentChartData={instrumentChartData} />);
      expect(wrapper.type()).to.equal('div');
    });
    it('should have a className of instrumentBubble', () => {
      const wrapper = shallow(<InstrumentBubble instrumentChartData={instrumentChartData} />);
      expect(wrapper.find('.instrumentBubble')).to.have.lengthOf(1);
    });
  });
});
