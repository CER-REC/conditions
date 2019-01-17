import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import RegionCompanies from '.';

const companies = ['Canada-Montana Pipe Line Company', 'Express Pipeline Ltd.', 'Kinder Morgan Cochin Ulc.', 'Nova Gas Transmission Ltd.'];
const active = ['Kinder Morgan Cochin Ulc.'];
const noop = () => {};

describe('Components|RegionCompanies', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <RegionCompanies
          companies={companies}
          activeConditionCompanies={active}
          openProjectDetails={noop}
        />,
      );
    });

    shouldBehaveLikeAComponent(RegionCompanies, () => wrapper);

    it('Should display a list of 4 items', () => {
      expect(wrapper.find('li')).to.have.a.lengthOf(4);
    });
  });
});
