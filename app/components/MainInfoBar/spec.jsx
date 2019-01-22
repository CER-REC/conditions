import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import MainInfoBar from '.';

describe('Components|MainInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<MainInfoBar
        onChange={spy}
        handleOnClick={spy}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.MainInfoBar')).to.equal((true));
    });

    it('should show four share icons ', () => {
      expect(wrapper.find('ShareIcon')).to.have.lengthOf(4);
    });

    it('should show a horizontal line', () => {
      expect(wrapper.find('hr')).to.have.lengthOf(1);
    });

    it('should show three text links', () => {
      expect(wrapper.find('button')).to.have.lengthOf(3);
    });
  });
});
