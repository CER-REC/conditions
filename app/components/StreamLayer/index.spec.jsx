import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StreamLayer from './';

describe('Components|StreamLayer', () => {
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
        { date: 2016, count: 120 },
        { date: 2017, count: 46 },
      ],
    },
  ];

  describe('without any props', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<StreamLayer projectData={[]} />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<StreamLayer projectData={projectData} />);
    });

    it('should render', () => {
      expect(wrapper.find('VictoryArea')).to.have.lengthOf(1);
    });
  });
});
