import React from 'react';
import { shallow } from 'enzyme';

import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import RegionCompanies from '.';

const companies = [
  { id: 1, name: 'Canada-Montana Pipe Line Company' },
  { id: 2, name: 'Express Pipeline Ltd.' },
  { id: 3, name: 'Kinder Morgan Cochin Ulc.' },
  { id: 4, name: 'Nova Gas Transmission Ltd.' },
  { id: 11, name: 'Alberta Trans-Alta è' },
  { id: 12, name: 'Alberta Trans-Alta e' },
  { id: 13, name: 'Z-Anti' },
  { id: 14, name: 'Power Plants R Us' },
];
const active = [3];
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|RegionSummary/RegionCompanies', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <RegionCompanies
          companies={companies}
          activeConditionCompanies={active}
          openProjectDetails={noop}
          selectCompany={noop}
        />,
      );
    });

    shouldBehaveLikeAComponent(RegionCompanies, () => wrapper);

    test('should display a list of 8 items', () => {
      expect(wrapper.find('li')).toHaveLength(8);
    });

    test('should display companies in alphabetical order', () => {
      expect(wrapper.find('li').at(0).childAt(0).text()).toEqual('Alberta Trans-Alta e');
      expect(wrapper.find('li').at(1).childAt(0).text()).toEqual('Alberta Trans-Alta è');
      expect(wrapper.find('li').at(2).childAt(0).text()).toEqual('Canada-Montana Pipe Line Company');
      expect(wrapper.find('li').at(3).childAt(0).text()).toEqual('Express Pipeline Ltd.');
      expect(wrapper.find('li').at(4).childAt(0).text()).toEqual('Kinder Morgan Cochin Ulc.');
      expect(wrapper.find('li').at(5).childAt(0).text()).toEqual('Nova Gas Transmission Ltd.');
    });

    test('should display a asterisk beside Kinder Morgan Cochin Ulc.', () => {
      expect(
        wrapper
          .find('li').at(4)
          .find('button')
          .last()
          .hasClass('asterisk'),
      ).toBe(true);
    });
  });

  describe('when a company is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <RegionCompanies
          companies={companies}
          activeConditionCompanies={active}
          openProjectDetails={noop}
          selectCompany={spy}
        />,
      );
    });
    test('should call the selectCompany function', () => {
      wrapper.find('button').first().simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(12, eventFuncs);
    });
  });

  describe('when the asterisk is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <RegionCompanies
          companies={companies}
          activeConditionCompanies={active}
          openProjectDetails={spy}
          selectCompany={noop}
        />,
      );
    });
    test('should call the openProjectDetails function', () => {
      wrapper.find('.asterisk').first().simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(3, eventFuncs);
    });
  });
});
