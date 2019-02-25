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
      wrapper = shallow(<SuggestedKeywordsPrompt onClick={spy} />);
    });

    shouldBehaveLikeAComponent(SuggestedKeywordsPrompt, () => wrapper);

    test('onClick should call onClick prop', () => {
      const updatedWrapper = wrapper.find('.arrow');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
