import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ChartIndicator from '.';

describe('Components|ChartIndicator', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ChartIndicator x={50} ystart={50} yend={150} />,
    );
  });
  describe('with default props', () => {
    it('should have a classname of Controller', () => {
      expect(wrapper.find('.Controller')).to.have.lengthOf(1);
    });
    it('should render a path', () => {
      expect(wrapper.find('path')).to.have.lengthOf(1);
    });
    it('should render a line', () => {
      expect(wrapper.find('line')).to.have.lengthOf(1);
    });
  });
});
describe('without radius', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ChartIndicator x={50} ystart={50} yend={150} />,
    );
  });
  it('should not render a circle', () => {
    expect(wrapper.exists('circle')).to.equal(false);
  });
});
describe('with radius', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ChartIndicator x={50} yTop={40} yBottom={100} radius={40} />,
    );
  });
  it('should render a circle', () => {
    expect(wrapper.find('circle')).to.have.lengthOf(1);
  });

  it('should render a circle with proper radius', () => {
    expect(wrapper.find('circle').prop('r')).to.equal(40);
  });
});
