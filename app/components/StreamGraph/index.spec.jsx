import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Streamgraph, { roundDateLabel, StackGroup } from './';

describe('Components|StreamGraph', () => {
  const projectData = [
    {
      id: 'themeOne',
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
      id: 'themeTwo',
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
      id: 'themeThree',
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

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Streamgraph
        projectData={projectData}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.streamgraph')).to.equal((true));
    });

    it('should render a title', () => {
      expect(wrapper.find('h1')).to.have.lengthOf(1);
    });

    it('should render a chart', () => {
      expect(wrapper.find('VictoryChart')).to.have.lengthOf(1);
    });

    it('should render the streams in a stack', () => {
      expect(wrapper.find('VictoryStack')).to.have.lengthOf(1);
    });

    it('should render the x and y axis', () => {
      expect(wrapper.find('VictoryAxis')).to.have.lengthOf(2);
    });

    it('should round the date label', () => {
      expect(roundDateLabel(2018.1)).to.be.equal(2018);
    });
  });

  // describe('with the Control visible', () => {
  //   let stack;
  //   let onChange;
  //   beforeEach(() => {
  //     onChange = sinon.spy();
  //     stack = mount(<StackGroup
  //       onChange={onChange}
  //       projectData={projectData}
  //     />);
  //   });

  //   it('should render a stack group', () => {
  //     expect(stack.type()).to.equal('g');
  //   });
  // });
});
