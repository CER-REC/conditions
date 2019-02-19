import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import TrendButton from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };
const projectData = [
  {
    name: 'themeOne',
    key: 2420,
    color: 'pink',
    graphData: [
      { date: 2010, count: 0 },
      { date: 2011, count: 12 },
      { date: 2012, count: 23 },
      { date: 2013, count: 30 },
      { date: 2014, count: 150 },
      { date: 2015, count: 260 },
      { date: 2016, count: 445 },
      { date: 2017, count: 436 },
    ],
  },
  {
    name: 'themeTwo',
    key: 2420,
    color: 'blue',
    graphData: [
      { date: 2010, count: 11 },
      { date: 2011, count: 23 },
      { date: 2012, count: 34 },
      { date: 2013, count: 41 },
      { date: 2014, count: 77 },
      { date: 2015, count: 82 },
      { date: 2016, count: 99 },
      { date: 2017, count: 120 },
    ],
  },
  {
    name: 'themeThree',
    key: 2420,
    color: 'orange',
    graphData: [
      { date: 2010, count: 14 },
      { date: 2011, count: 30 },
      { date: 2012, count: 46 },
      { date: 2013, count: 65 },
      { date: 2014, count: 83 },
      { date: 2015, count: 95 },
      { date: 2016, count: 140 },
      { date: 2017, count: 11 },
    ],
  },
];

describe('Components|TrendButton', () => {
  describe('with default selectedFeature', () => {
    let wrapper;
    const feature = 'theme';

    beforeEach(() => {
      wrapper = shallow(<TrendButton
        onClick={noop}
        feature={feature}
        projectData={projectData}
      />);
    });
    test('should render a div with a className of buttonText', () => {
      expect(wrapper.find('div.buttonText')).toHaveLength(1);
    });
    test('should render StreamGraph Component', () => {
      expect(wrapper.find('StreamGraph')).toHaveLength(1);
    });
    test('should render a FormattedMessage component for button text', () => {
      const messageWrapper = wrapper.find(FormattedMessage);
      expect(messageWrapper).toHaveLength(1);
      expect(messageWrapper.prop('id')).toBe('components.trendButton.description');
      const updatedWrapper = messageWrapper.shallowWithIntl();
      expect(updatedWrapper.find('p')).toHaveLength(2)
    });
  });

  describe('with instrument selected', () => {
    test('it should not render streamgraph', () => {
      const wrapper = shallow(<TrendButton onClick={noop} feature="instrument" projectData={projectData} />);
      expect(wrapper.find('StreamGraph')).toHaveLength(0);
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
        projectData={projectData}
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
