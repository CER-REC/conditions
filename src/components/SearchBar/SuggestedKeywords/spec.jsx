import React from 'react';
import { shallow } from 'enzyme';
import SuggestedKeywords from '.';
import './styles.scss';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SuggestedKeywords', () => {
  describe('default', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<SuggestedKeywords onClick={spy} />);
    });

    shouldBehaveLikeAComponent(SuggestedKeywords, () => wrapper);

    test('onClick should call onClick prop', () => {
      const updatedWrapper = wrapper.find('CircleContainer');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('render suggestedKeywords with breaks', () => {
      const updatedWrapper = wrapper.find('FormattedMessage').at(1).shallowWithIntl();
      expect(updatedWrapper.find('br')).toHaveLength(2);
    });
  });
});
