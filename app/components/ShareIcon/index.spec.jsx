import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { shouldHaveInteractionProps } from '../../tests/utilities';

import ShareIcon from '.';

describe('Components|ShareIcon', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShareIcon />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.ShareIcon')).to.equal((true));
    });
  });

  describe('with passed props', () => {
    it('should take in the onClick prop', () => {
      const wrapper = shallow((
        <ShareIcon
          onClick={() => {}}
        />
      ));
      shouldHaveInteractionProps(wrapper);
    });
  });
});
