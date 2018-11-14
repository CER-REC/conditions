import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import List from './';

describe('Components|List', () => {
  describe('This component renders', () => {
    it('should render', () => {
      const wrapper = shallow(<List />);
      expect(wrapper.type()).to.equal('div');
    });
  });
});