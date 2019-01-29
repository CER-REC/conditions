import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import ShareIcon from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };
const target = 'facebook';

describe('Components|ShareIcon', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShareIcon target={target} />);
  });

  shouldBehaveLikeAComponent(ShareIcon, () => wrapper);

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
    wrapper.setProps({ target: 'email', prefix: 'fas' });
    expect(wrapper.simulate('click', eventFuncs));
    expect(wrapper.find('Icon').props().icon).toBe('envelope');
    expect(window.location.assign).toHaveBeenCalled();
  });
});
