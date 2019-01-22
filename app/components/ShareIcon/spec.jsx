import React from 'react';
import { shallow } from 'enzyme';
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

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.ShareIcon')).toBe(true);
    });

    test('should have take in an onClick props', () => {
      const tester = shallow((
        <ShareIcon
          onClick={() => {}}
        >
          Test
        </ShareIcon>
      ));
      shouldHaveInteractionProps(tester);
    });

    test('should handle if target is facebook', () => {
      wrapper.setProps({ target: 'facebook' });
      expect(wrapper.simulate('click', eventFuncs));
      expect(wrapper.find('Icon').props().icon).toBe('facebook');
    });

    test('should handle if target is twitter', () => {
      wrapper.setProps({ target: 'twitter' });
      expect(wrapper.find('Icon').props().icon).toBe('twitter');
    });

    test('should handle if target is linkedin', () => {
      wrapper.setProps({ target: 'linkedin' });
      expect(wrapper.find('Icon').props().icon).toBe('linkedin');
    });

    test('should handle if target is email', () => {
      wrapper.setProps({ target: 'email' });
      expect(wrapper.find('Icon').props().icon).toBe('envelope');
    });
  });
});
