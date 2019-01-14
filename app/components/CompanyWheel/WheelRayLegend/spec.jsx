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
  { legend: 'K', count: 30 },
];

describe('Components|CompanyWheel/WheelRayLegend', () => {
  describe('with default props', () => {
    const wrapperSetup = (propOverrides) => {
      const props = Object.assign({
        legendPositionArray: mockData,
        numOfItems: 1,
        rotation: 0,
        degreesPerItem: 0,
        reservedDegrees: 10,

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
      const { wrapper } = wrapperSetup({ degreesPerItem: 1 });
      expect(wrapper.find('text').first().props().transform).to.contain('rotate(21, 0, 245)');
    });
  });
});

