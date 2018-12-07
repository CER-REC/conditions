import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StreamLayer from './';

describe('Components|StreamLayer', () => {
  const projectId = 'themeNumber';
  const projectColor = 'grey';
  const strokeColor = 'none';
  const strokeWidth = 0;
  const standalone = true;
  const dataValues = [
    { date: 2010, count: 20 },
    { date: 2011, count: 40 },
    { date: 2012, count: 60 },
    { date: 2013, count: 10 },
    { date: 2014, count: 100 },
    { date: 2015, count: 22 },
    { date: 2016, count: 81 },
    { date: 2017, count: 48 },
  ];

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<StreamLayer
        projectId={projectId}
        projectColor={projectColor}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        dataValues={dataValues}
        standalone={standalone}
      />);
    });

    it('should render', () => {
      expect(wrapper.find('VictoryArea')).to.have.lengthOf(1);
    });

    it('should take in props for id', () => {
      expect(wrapper.props().name).to.equal('themeNumber');
    });

    it('should take in props for data', () => {
      expect(wrapper.props().data).to.have.lengthOf(8);
    });

    it('should take in props for fill', () => {
      expect(wrapper.props().style.data.fill).to.equal('grey');
    });

    it('should take in props for stroke', () => {
      expect(wrapper.props().style.data.stroke).to.equal('none');
    });

    it('should take in props for strokeWidth', () => {
      expect(wrapper.props().style.data.strokeWidth).to.equal(0);
    });

    it('should take in props for standalone', () => {
      expect(wrapper.props().standalone).to.equal(true);
    });
  });
});
