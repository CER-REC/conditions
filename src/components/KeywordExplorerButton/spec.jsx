import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import KeywordExplorerButton from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|KeywordExplorerButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<KeywordExplorerButton
      onClick={noop}
    />);
  });
  test('should render a div with a className of buttonText', () => {
    expect(wrapper.find('div.buttonText')).toHaveLength(1);
  });
  test('should render a FormattedMessage component for button text', () => {
    const messageWrapper = wrapper.find(FormattedMessage);
    expect(messageWrapper).toHaveLength(1);
    expect(messageWrapper.prop('id')).toBe('components.keywordExploreButton.description');
    const updatedWrapper = messageWrapper.shallowWithIntl();
    expect(updatedWrapper.find('p')).toHaveLength(2);
  });

  describe('when a KeywordExplorerButton is clicked', () => {
    let spy;
    let wrapperSpy;
    beforeEach(() => {
      spy = jest.fn();
      wrapperSpy = shallow(<KeywordExplorerButton
        onClick={spy}
      />);
    });
    test("should call it's onClick prop", () => {
      wrapperSpy.find('.KeywordExplorerButton').simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalled();
    });
    test("should call it's onClick prop when enter is pressed", () => {
      wrapperSpy.find('.KeywordExplorerButton').simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy).toHaveBeenCalled();
    });
  });
});
