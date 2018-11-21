import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import IconSelector from './';

describe('Components|IconSelector', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<IconSelector>Test</IconSelector>);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should render the children', () => {
      expect(wrapper.text()).to.equal('Test');
    });

    it('should have an IconSelector class', () => {
      expect(wrapper.is('.IconSelector')).to.equal(true);
    });

    it('should have no background', () => {
      expect(wrapper.props().style.background).to.equal('none');
    });

    it('should have no border', () => {
      expect(wrapper.props().style.background).to.equal('none');
    });

    it('should inherit the text color', () => {
      expect(wrapper.props().style.color).to.equal('inherit');
    });
  });
});
