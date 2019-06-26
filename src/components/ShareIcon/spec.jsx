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

  test.each(['facebook', 'twitter', 'linkedin'])(
    'should handle if target is %s', (socialMedia) => {
      wrapper.setProps({ target: socialMedia });
      expect(wrapper.simulate('click', eventFuncs));
      expect(wrapper.find('Icon').props().icon).toBe(socialMedia);
    },
  );

  test('should handle if target is email', () => {
    wrapper.setProps({ target: 'email', prefix: 'fas' });
    expect(wrapper.simulate('click', eventFuncs));
    expect(wrapper.find('Icon').props().icon).toBe('envelope');
  });
});
