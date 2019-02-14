import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import WheelRayLegend from '.';

const mockData = [
  { legend: 'A', count: 30 },
  { legend: 'B', count: 30 },
  { legend: 'C', count: 30 },
  { legend: 'D', count: 30 },
  { legend: 'E', count: 30 },
  { legend: 'E', count: 30 },
  { legend: 'F', count: 30 },
  { legend: 'G', count: 30 },
  { legend: 'H', count: 30 },
  { legend: 'I', count: 30 },
  { legend: 'J', count: 30 },
];

describe('Components|CompanyWheel/WheelRayLegend', () => {
  describe('with default props', () => {
    const reservedDegrees = 30;
    const degreesPerItem = (360 - reservedDegrees) / (mockData.length * 30);

    const wrapperSetup = (propOverrides) => {
      const props = Object.assign({
        legendPositionArray: mockData,
        reservedDegrees,
        degreesPerItem,
        rotation: 90,
      }, propOverrides);

      const wrapper = shallow(<WheelRayLegend {...props} />);

      return {
        props,
        wrapper,
      };
    };

    it('should render and return a react fragment', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.type()).to.equal(React.Fragment);
    });

    it('should render a ray at position 0');

    it('should render the same amount of items as the length of the array passed');

    it('should not render anything between 90 +/- (reserved degrees/2) unless is at the 90 degrees position');

    it('should render an item before the gap');

    it('should render an item at 90 degrees');

    it('should render an item after the gap');
  });
});
