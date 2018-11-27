import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Streamgraph from './';

describe('Components|Streamgraph', () => {
  const projectData = [
    {
      id: 'Security',
      graphData: {
        date: 2010,
        count: 0,
      },
    },
    {
      id: 'Management System',
      graphData: {
        date: 2017,
        count: 1436,
      },
    },
    {
      id: 'Integrity Management',
      graphData: {
        date: 2013,
        count: 1000,
      },
    },
    {
      id: 'Standard Condition',
      graphData: {
        date: 2015,
        count: 500,
      },
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
  });
});
