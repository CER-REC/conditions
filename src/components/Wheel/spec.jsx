import React from 'react';
import { shallow } from 'enzyme';

import Wheel from '.';
import { companyWheelData as wheelData } from './randomDataSample';

describe('Components|Wheel', () => {
  describe('with no wheelType prop', () => {
    test('should render a company wheel', () => {
      expect(shallow(<Wheel itemsData={wheelData} selectRay={() => {}} />).type()).toBe('div');
    });

    // it('should have the prop company by default', () => {
    //   expect(shallow(<CompanyWheel />).prop('ringType')).to.equal('company');
    // });
  });
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Wheel wheelType="Company" itemsData={wheelData} selectRay={() => {}} />);
    });

    test('should render a div', () => {
      expect(wrapper.type()).toBe('div');
    });
  });

  // TODO: IMPLEMENT THE LOCATION TESTS ONCE THEY ARE IMPLEMENTED ON THE DESIGN DOC
});

