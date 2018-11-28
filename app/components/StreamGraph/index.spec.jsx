import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Streamgraph from './';

describe('Components|Streamgraph', () => {
  const projectData = [
    {
      id: 'themeOne',
      color: 'pink',
      graphData: [
        { date: 2010, count: 0 },
        { date: 2011, count: 120 },
        { date: 2012, count: 230 },
        { date: 2013, count: 340 },
        { date: 2014, count: 550 },
        { date: 2015, count: 760 },
        { date: 2016, count: 1220 },
        { date: 2017, count: 1436 },
      ],
    },
    {
      id: 'themeTwo',
      color: 'blue',
      graphData: [
        { date: 2010, count: 0 },
        { date: 2011, count: 230 },
        { date: 2012, count: 340 },
        { date: 2013, count: 410 },
        { date: 2014, count: 770 },
        { date: 2015, count: 820 },
        { date: 2016, count: 990 },
        { date: 2017, count: 1270 },
      ],
    },
    {
      id: 'themeThree',
      color: 'orange',
      graphData: [
        { date: 2010, count: 140 },
        { date: 2011, count: 340 },
        { date: 2012, count: 456 },
        { date: 2013, count: 650 },
        { date: 2014, count: 830 },
        { date: 2015, count: 954 },
        { date: 2016, count: 1240 },
        { date: 2017, count: 1411 },
      ],
    },
  ];

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Streamgraph projectData={projectData} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should render a className', () => {
      expect(wrapper.is('.streamgraph')).to.equal((true));
    });

    it('should render a title', () => {
      expect(wrapper.find('h1')).to.have.lengthOf(1);
    });

    it('should render a chart', () => {
      expect(wrapper.find('VictoryChart')).to.have.lengthOf(1);
    });

    it('should render the stacked chart', () => {
      expect(wrapper.find('VictoryStack')).to.have.lengthOf(1);
    });

    it('should render the x and y axis', () => {
      expect(wrapper.find('VictoryAxis')).to.have.lengthOf(2);
    });
  });
});
