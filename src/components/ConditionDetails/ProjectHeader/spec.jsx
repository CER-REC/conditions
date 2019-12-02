import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ProjectHeader from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const singleCompany = [{ id: 1, name: 'Company1' }];
const multipleCompany = [{ id: 1, name: 'Company1' }, { id: 2, name: 'Company2' }];

describe('Components|ConditionDetails/ProjectHeader', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    spy = {
      openProjectDetails: jest.fn(),
      toggleExpanded: jest.fn(),
    };
  });

  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectHeader
          selectedProject="Keystone XL"
          companies={singleCompany}
          {...spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(ProjectHeader, () => wrapper);
  });

  describe('single company', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectHeader
          selectedProject="Keystone XL"
          companies={singleCompany}
          {...spy}
        />,
      );
    });
    test('should not render the button', () => {
      const updatedWrapper = wrapper.find('.ProjectHeader')
        .find('.openProject');
      expect(updatedWrapper.exists()).toBeFalsy();
    });
  });

  describe('multiple', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectHeader
          selectedProject="Keystone XL"
          companies={multipleCompany}
          {...spy}
        />,
      );
    });
    test('should call its openProjectDetails callback', () => {
      wrapper.find('.ProjectHeader')
        .find('.openProject')
        .simulate('click', eventFuncs);

      expect(spy.openProjectDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe('expandable', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectHeader
          {...spy}
          isExpandable
          selectedProject="Keystone XL"
          companies={singleCompany}
        />,
      );
    });

    test('should call its toggleExpanded callback', () => {
      wrapper.find('.ProjectHeader')
        .find('.toggleExpand')
        .simulate('click', eventFuncs);

      expect(spy.toggleExpanded).toHaveBeenCalledTimes(1);
    });
  });
});
