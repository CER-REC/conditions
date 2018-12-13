import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import WheelRayLegend from './';

const mockData = [
  { legend: 'A', count: 30 },
  { legend: 'B', count: 30 },
  { legend: 'C', count: 30 },
  { legend: 'D', count: 30 },
  { legend: 'E', count: 30 },
];

describe('Components|CompanyWheel/WheelRayLegend', () => {
  describe('with default props', () => {
    const wrapperSetup = (propOverrides) => {
      const props = Object.assign({
        ringType: 'company',
        legendPositionArray: mockData,
        numOfItems: 1,
        rotation: 0,
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
  });
});

