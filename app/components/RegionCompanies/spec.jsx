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

    it('should display a list of 4 items', () => {
      expect(wrapper.find('li')).to.have.a.lengthOf(4);
    });

    it('should display companies in alphabetical order', () => {
      expect(wrapper.find('li').at(0).text()).to.contain('Canada-Montana Pipe Line Company');
      expect(wrapper.find('li').at(1).text()).to.contain('Express Pipeline Ltd.');
      expect(wrapper.find('li').at(2).text()).to.contain('Kinder Morgan Cochin Ulc.');
      expect(wrapper.find('li').at(3).text()).to.contain('Nova Gas Transmission Ltd.');
    });

    it('should display a asterisk beside Kinder Morgan Cochin Ulc.', () => {
      expect(wrapper.find('li').at(2).find('button').type()).to.equal('button');
    });
  });
});
