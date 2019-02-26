import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import { conditionCountsByYear } from '../../mockData';
import d3HierarchyCalculation from '../BubbleChart/d3HierarchyCalculation';
import TrendButton from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const instrumentData = {
  name: 'data',
  children: [{
    parentName: 'anyCommodityTypes',
    children: [
      {
        name: '1',
        children: [],
        value: 15,
        category: 'construction',
      }, {
        name: '2',
        children: [],
        value: 15,
        category: 'misc',
      }, {
        name: '3',
        children: [],
        value: 15,
        category: 'tariffs',
      }],
  }],
};

const chartInstrumentData = d3HierarchyCalculation(instrumentData, 120, 50);

describe('Components|TrendButton', () => {
  describe('with default selectedFeature', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<TrendButton
        onClick={noop}
        feature="theme"
        subFeature=""
        projectData={conditionCountsByYear.counts}
        instrumentData={chartInstrumentData}
      />);
    });
    test('should render a div with a className of buttonText', () => {
      expect(wrapper.find('div.buttonText')).toHaveLength(1);
    });
    test('should render StreamGraph Component', () => {
      expect(wrapper.find('StreamGraph')).toHaveLength(1);
    });
    test('should not render InstrumentBubble Component', () => {
      expect(wrapper.find('InstrumentBubble')).toHaveLength(0);
    });
    test('should render a FormattedMessage component for button text', () => {
      const messageWrapper = wrapper.find(FormattedMessage);
      expect(messageWrapper).toHaveLength(1);
      expect(messageWrapper.prop('id')).toBe('components.trendButton.description');
      const updatedWrapper = messageWrapper.shallowWithIntl();
      expect(updatedWrapper.find('p')).toHaveLength(2);
    });
  });

  describe('with instrument selected', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TrendButton
        onClick={noop}
        feature="instrument"
        subFeature=""
        projectData={conditionCountsByYear.counts}
        instrumentData={chartInstrumentData}
      />);
    });
    test('it should not render StreamGraph', () => {
      expect(wrapper.find('StreamGraph')).toHaveLength(0);
    });
    test('it should render InstrumentBubble', () => {
      expect(wrapper.find('InstrumentBubble')).toHaveLength(1);
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
        subFeature=""
        projectData={conditionCountsByYear.counts}
        instrumentData={chartInstrumentData}
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
