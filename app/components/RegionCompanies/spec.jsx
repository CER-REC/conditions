import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import RegionCompanies from '.';

const companies = [
  { id: '1', name: 'Canada-Montana Pipe Line Company' },
  { id: '2', name: 'Express Pipeline Ltd.' },
  { id: '3', name: 'Kinder Morgan Cochin Ulc.' },
  { id: '4', name: 'Nova Gas Transmission Ltd.' }];
const active = ['3'];
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

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

  describe('when the asterisk is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(
        <RegionCompanies
          companies={companies}
          activeConditionCompanies={active}
          openProjectDetails={spy}
        />,
      );
    });
    it('should call the openProjectDetails function', () => {
      wrapper.find('button').first().simulate('click', eventFuncs);
      expect(spy.calledOnce).to.equal(true);
    });
  });
});
