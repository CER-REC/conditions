import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ProjectHeader from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

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
          openProjectDetails={spy.openProjectDetails}
          toggleExpanded={spy.toggleExpanded}
        />,
      );
    });

    shouldBehaveLikeAComponent(ProjectHeader, () => wrapper);

    test('should call its openProjectDetails callback', () => {
      wrapper.find('.ProjectHeader')
        .find('.openProject')
        .simulate('click', eventFuncs);

      expect(spy.openProjectDetails).toHaveBeenCalledTimes(1);
    });

    test('should not have a button to toggle the expanded view', () => {
      const results = wrapper.find('.ProjectHeader')
        .find('.toggleExpand');

      expect(results.length).toBe(0);
    });
  });

  describe('expandable', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectHeader
          selectedProject="Keystone XL"
          openProjectDetails={spy.openProjectDetails}
          toggleExpanded={spy.toggleExpanded}
          isExpandable
        />,
      );
    });

    test('should have a button to toggle the expanded view', () => {
      const results = wrapper.find('.ProjectHeader')
        .find('.toggleExpand');

      expect(results.length).toBe(1);
    });

    test('should call its toggleExpanded callback', () => {
      wrapper.find('.ProjectHeader')
        .find('.toggleExpand')
        .simulate('click', eventFuncs);

      expect(spy.toggleExpanded).toHaveBeenCalledTimes(1);
    });
  });
});
