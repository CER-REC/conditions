import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { shouldHaveInteractionProps } from '../../tests/utilities';

import ShareIcon from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|ShareIcon', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<ShareIcon onClick={spy} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.ShareIcon')).to.equal((true));
    });

    it('should have take in an onClick props', () => {
      const tester = shallow((
        <ShareIcon
          onClick={() => {}}
        >
          Test
        </ShareIcon>
      ));
      shouldHaveInteractionProps(tester);
    });

    it('should handle if target is facebook', () => {
      wrapper.setProps({ target: 'facebook' });
      expect(wrapper.simulate('click', eventFuncs));
      expect(wrapper.find('Icon').props().icon).to.equal('facebook');
    });

    it('should handle if target is twitter', () => {
      wrapper.setProps({ target: 'twitter' });
      expect(wrapper.find('Icon').props().icon).to.equal('twitter');
    });

    it('should handle if target is linkedin', () => {
      wrapper.setProps({ target: 'linkedin' });
      expect(wrapper.find('Icon').props().icon).to.equal('linkedin');
    });

    it('should handle if target is email', () => {
      wrapper.setProps({ target: 'email' });
      expect(wrapper.find('Icon').props().icon).to.equal('envelope');
    });
  });
});
