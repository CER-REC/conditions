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

    it('should give a letter(s)  rendered at position 0', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.find('text').first().text()).to.be.a('string');
    });

    it('should render the same amount of objects as the length of the array passed', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.find('text').length).to.equals(mockData.length);
    });

    it('should not render anything between 90 +/- (reserved degrees/2) unless is at the 90 degrees position', () => {
      const newReservedDegrees = 20;
      const newDegreesPerItem = (360 - newReservedDegrees) / (mockData.length * 30);
      const { wrapper } = wrapperSetup(
        { reservedDegrees: newReservedDegrees, degreesPerItem: newDegreesPerItem },
      );
      const calculatePositions = () => {
        const possiblePositionsArray = [];
        for (let i = 90 - newReservedDegrees / 2;
          i < 90 + newReservedDegrees / 2;
          i += newDegreesPerItem) {
          // if (i !== 90) {
          possiblePositionsArray.push(`rotate(${i}, 0, 245)`);
          // }
        }
        return possiblePositionsArray;
      };
      // console.log(JSON.stringify(calculatePositions()));
      expect(wrapper.find('text').forEach((node) => {
        console.log(node.debug());
        expect(node.props().transform).to.not.contain.any.keys(calculatePositions());
      }));
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

