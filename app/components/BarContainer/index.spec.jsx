import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import BarContainer from '.';

/*

it('', () => {
    });

*/

describe('Components|BarContainer', () => {
  describe('with default props', () => {
    const rectItems = [
      {
        width: 80,
        height: 10,
        x: 0,
        y: 0,
        fill: 'tomato',
      },
      {
        width: 40,
        height: 10,
        x: 0,
        y: 0,
        fill: 'red',
      },
    ];

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BarContainer items={rectItems} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a BarContainer class', () => {
      expect(wrapper.is('.BarContainer')).to.equal(true);
    });
  });
});
