import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { shouldBehaveLikeAComponent, shouldHaveInteractionProps } from '../../tests/utilities';

import ShareIcon from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };
const target = 'facebook';
const icon = '';

describe('Components|ShareIcon', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShareIcon target={target} icon={icon} />);
    });

    shouldBehaveLikeAComponent(ShareIcon, () => wrapper);

    test('should have take in an onClick props', () => {
      const tester = shallow((
        <ShareIcon
          onClick={() => {}}
          target={target}
          icon={icon}
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
      expect(global.open).toBeCalled();
    });

    test('should handle if target is twitter', () => {
      wrapper.setProps({ target: 'twitter' });
      expect(wrapper.simulate('click', eventFuncs));
      expect(wrapper.find('Icon').props().icon).toBe('twitter');
      expect(global.open).toBeCalled();
    });

    test('should handle if target is linkedin', () => {
      wrapper.setProps({ target: 'linkedin' });
      expect(wrapper.simulate('click', eventFuncs));
      expect(wrapper.find('Icon').props().icon).toBe('linkedin');
      expect(global.open).toBeCalled();
    });

    test('should handle if target is email', () => {
      const url = 'test';
      sinon.stub(window.location, 'assign');
      wrapper.setProps({ target: 'email' });
      expect(wrapper.simulate('click', eventFuncs));
      expect(wrapper.find('Icon').props().icon).toBe('envelope');
      expect(window.location).toBe(url);
    });
  });
});
