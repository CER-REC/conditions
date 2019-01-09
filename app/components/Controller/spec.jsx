import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Controller from '.';

describe('Components|Controller', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Controller x={50} ystart={50} yend={150} radius={20} text="123" />,
    );
  });

  describe('with props', () => {
    it('should render a div', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a classname of Controller', () => {
      expect(wrapper.find('.Controller')).to.have.lengthOf(1);
    });

    it('should render svg with proper calculated height', () => {
      expect(wrapper.find('svg').prop('height')).to.equal(240);
    });

    it('should translate the component with passed in props', () => {
      expect(wrapper.find('svg').prop('transform')).to.equal('translate(50, 50)');
    });
  });
});
