import React from 'react';
import { shallow } from 'enzyme';
import ChartIndicator from '.';

describe('Components|ChartIndicator', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ChartIndicator x={50} ystart={50} yend={150} />,
    );
  });
  describe('with default props', () => {
    test('should have a classname of ChartIndicator', () => {
      expect(wrapper.find('.ChartIndicator')).toHaveLength(1);
    });
    test('should render a path', () => {
      expect(wrapper.find('path')).toHaveLength(1);
    });
    test('should render a line', () => {
      expect(wrapper.find('line')).toHaveLength(1);
    });
  });
});
describe('without radius', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ChartIndicator x={50} ystart={50} yend={150} />,
    );
  });
  test('should not render a circle', () => {
    expect(wrapper.exists('circle')).toBe(false);
  });
});
describe('with radius', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ChartIndicator x={50} yTop={40} yBottom={100} radius={40} />,
    );
  });
  test('should render a circle', () => {
    expect(wrapper.find('circle')).toHaveLength(1);
  });

  test('should render a circle with proper radius', () => {
    expect(wrapper.find('circle').prop('r')).toBe(40);
  });
});
