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

describe('Components|Wheel/WheelRayLegend', () => {
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

    it('should give a letter(s)  rendered at position 0', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.find('text').first().text()).to.be.a('string');
    });

    it('should render the same amount of objects as the length of the array passed', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.find('text').length).to.equals(mockData.length);
    });

    it('should render elements between 0 and 360 which are equal to the elements provided', () => {
      const { wrapper } = wrapperSetup();
      expect(wrapper.find('text').first().props().transform).to.contain('rotate(0, 0, 245)');
    });

    it('should render an item at 90 degrees', () => {
      const { wrapper } = wrapperSetup();
      expect(wrapper.find('text').at(2).props().transform).to.contain('rotate(90, 0, 245)');
    });

    it('should render an item at 125 degrees');
  });
});
