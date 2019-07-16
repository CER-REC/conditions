import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import { conditionCountsByYear, displayOrder } from '../../mockData';
import TrendButton from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|TrendButton', () => {
  describe('with default selectedFeature', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<TrendButton
        onClick={noop}
        feature="theme"
        allConditionsPerYear={conditionCountsByYear}
        displayOrder={displayOrder}
      />);
    });
    test('should render a div with a className of buttonText', () => {
      expect(wrapper.find('div.buttonText')).toHaveLength(1);
    });
    test('should render a FormattedMessage component for button text', () => {
      const messageWrapper = wrapper.find(FormattedMessage);
      expect(messageWrapper).toHaveLength(1);
      expect(messageWrapper.prop('id')).toBe('components.trendButton.description');
      const updatedWrapper = messageWrapper.shallowWithIntl();
      expect(updatedWrapper.find('p')).toHaveLength(2);
    });
  });

  describe('when a trendButton is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<TrendButton
        onClick={spy}
        feature="theme"
        allConditionsPerYear={conditionCountsByYear}
        displayOrder={displayOrder}
      />);
    });
    test("should call it's onClick prop", () => {
      wrapper.find('.TrendButton').simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalled();
    });
    test("should call it's onClick prop when enter is pressed", () => {
      wrapper.find('.TrendButton').simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy).toHaveBeenCalled();
    });
  });
});
