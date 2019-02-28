import React from 'react';
import { shallow } from 'enzyme';

import WheelRay from '.';

import { companyWheelData as wheelData } from '../randomDataSample';

describe('Components|CompanyWheel/WheelRay', () => {
  describe('with default props', () => {
    const reservedDegrees = 30;
    const degreesPerItem = (360 - reservedDegrees) / (wheelData.items.length - 1);
    const rotation = 0;

    const wrapperSetup = (propOverrides) => {
      const props = Object.assign({
        items: wheelData.items,
        reservedDegrees,
        degreesPerItem,
        rotation,
        selectRay: '',
        wheelType: 'Company',
        currentIndex: 0,
      }, propOverrides);

      const wrapper = shallow(<WheelRay {...props} />);

      return {
        props,
        wrapper,
      };
    };

    it('should render and return a react fragment', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.type()).toBe(React.Fragment);
    });

    it('should render the same amount of items as the length of the array passed less 1', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.children()).toHaveLength(wheelData.items.length - 1);
    });

    it('should not render anything between ROTATION +/- (reserved degrees/2)', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.children()).not.toHaveProperty('transform', `translate(371 209) rotate(${wrapper.rotate}, 0, 245)`);
      expect(wrapper.children()).not.toHaveProperty('transform', `translate(371 209) rotate(${wrapper.rotation - (wrapper.reservedDegrees / 2)}, 0, 245)`);
      expect(wrapper.children()).not.toHaveProperty('transform', `translate(371 209) rotate(${wrapper.rotation + (wrapper.reservedDegrees / 2)}, 0, 245)`);
    });

    it('should render an item before the gap', () => {
      const positionBeforeGap = rotation + 90 + (reservedDegrees / 2);
      const transformValue = `translate(371 209) rotate(${positionBeforeGap.toFixed(2)}, 0, 245)`;
      const { wrapper } = wrapperSetup({});
      expect(wrapper.children().findWhere(
        g => g.props().transform === transformValue,
      )).toHaveLength(1);
    });

    it('should render an item after the gap', () => {
      // rotation + the offset of the stripe
      // - the adjustment for the ray against the pipe + half of the reserved degrees
      const positionAfterGap = rotation + 90 - (degreesPerItem)
        + 360 - reservedDegrees + reservedDegrees / 2;
      const transformValue = `translate(371 209) rotate(${positionAfterGap.toFixed(2)}, 0, 245)`;
      const { wrapper } = wrapperSetup({});
      expect(wrapper.children().findWhere(
        g => g.props().transform === transformValue,
      )).toHaveLength(1);
    });
  });
});
