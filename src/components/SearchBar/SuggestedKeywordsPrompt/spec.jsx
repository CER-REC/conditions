import React from 'react';
import { shallow } from 'enzyme';
import SuggestedKeywordsPrompt from '.';
import './styles.scss';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SuggestedKeywordsPrompt', () => {
  describe('default', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<SuggestedKeywordsPrompt onClick={spy} isActive={false} />);
    });

    shouldBehaveLikeAComponent(SuggestedKeywordsPrompt, () => wrapper);

    test('onClick should call onClick prop', () => {
      const updatedWrapper = wrapper.find('.arrow');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('if isActive is false, it should not render the className of active', () => {
      expect(wrapper.hasClass('isActive')).toBe(false);
    });

    test('if active is true, should render the class name of active', () => {
      wrapper.setProps({ isActive: true });
      expect(wrapper.hasClass('isActive')).toBe(true);
    });
  });
});
