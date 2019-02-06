import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import TrendButton from '.';
import StreamButton from './images/streamButton.png';
import BubbleButton from './images/bubbleButton.png';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|TrendButton', () => {
  describe('with a selectedFeature', () => {
    let wrapper;
    const feature = 'Theme';

    beforeEach(() => {
      wrapper = shallow(<TrendButton selectedFeature={feature} onClick={noop} />);
    });

    test('should render a button', () => {
      expect(wrapper.find('button')).toHaveLength(1);
    });

    test('should render a div with a className of trendButton', () => {
      expect(wrapper.find('div.trendButton')).toHaveLength(1);
    });

    test('should render a div with a className of buttonText', () => {
      expect(wrapper.find('div.buttonText')).toHaveLength(1);
    });

    test('should render a FormattedMessage component for button text', () => {
      const messageWrapper = wrapper.find(FormattedMessage);

      expect(messageWrapper).toHaveLength(1);
      expect(messageWrapper.prop('id')).toBe(`components.trendButton.${feature}`);
      // TODO: Test that the message replaces line breaks with <br />
    });
  });

  describe('when a trendButton is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<TrendButton selectedFeature="Theme" onClick={spy} />);
    });

    test("should call it's onClick prop", () => {
      wrapper.find('button').simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalled();
    });

    test("should call it's onClick prop when enter is pressed", () => {
      wrapper.find('button').simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('if streamGraph available', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TrendButton selectedFeature="Theme" streamGraphData={[1, 2, 3]} onClick={noop} />);
    });

    // TODO: Add this test when StreamGraph is implemented for TrendButton
    test.skip('renders StreamGraph component correctly', () => {});

    test('renders a div with a className of streamGraphBackground', () => {
      expect(wrapper.find('div.streamGraphBackground')).toHaveLength(1);
    });
  });

  describe('if streamGraph not available', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TrendButton selectedFeature="Theme" onClick={noop} />);
    });

    test('renders a div with a className of staticBackground', () => {
      expect(wrapper.find('div.staticBackground')).toHaveLength(1);
    });

    test('renders an image tag', () => {
      expect(wrapper.find('img')).toHaveLength(1);
    });
  });

  describe('if streamGraph not available and Instrument is selected', () => {
    test('has image source of BubbleButton', () => {
      const wrapper = shallow(<TrendButton selectedFeature="Instrument" onClick={noop} />);
      expect(wrapper.find('img').prop('src')).toBe(BubbleButton);
    });
  });

  describe('if streamGraph not available and anything other than Instrument is selected', () => {
    test('has image source of StreamButton', () => {
      const wrapper = shallow(<TrendButton selectedFeature="Phase" onClick={noop} />);
      expect(wrapper.find('img').prop('src')).toBe(StreamButton);
    });
  });
});
