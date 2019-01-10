import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Controller from '.';

describe('Components|Controller', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Controller x={50} ystart={50} yend={150} />,
    );
  });
  describe('with default props', () => {
    it('should render a div', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a classname of Controller', () => {
      expect(wrapper.find('.Controller')).to.have.lengthOf(1);
    });
    it('should render an svg ', () => {
      expect(wrapper.find('svg')).to.have.lengthOf(1);
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
      <Controller x={50} ystart={50} yend={150} />,
    );
  });
  it('should not render a circle', () => {
    expect(wrapper.exists('circle')).to.equal(false);
  });

  it('should have svg height excluding diameter', () => {
    expect(wrapper.find('svg').prop('height')).to.equal(200);
  });

  it('should have svg width excluding diameter', () => {
    expect(wrapper.find('svg').prop('width')).to.equal(20);
  });
});
describe('with radius', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Controller x={50} ystart={40} yend={100} radius={40} />,
    );
  });
  it('should render a circle', () => {
    expect(wrapper.find('circle')).to.have.lengthOf(1);
  });

  it('should render a circle with proper radius', () => {
    expect(wrapper.find('circle').prop('r')).to.equal(40);
  });

  it('should have svg height including diameter', () => {
    expect(wrapper.find('svg').prop('height')).to.equal(220);
  });

  it('should have svg witdth including diameter', () => {
    expect(wrapper.find('svg').prop('width')).to.equal(80);
  });
});
