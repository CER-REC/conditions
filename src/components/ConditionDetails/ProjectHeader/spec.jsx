import React from 'react';
import { shallow } from 'enzyme';
import CompanyPopup from '../../CompanyPopup';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ProjectHeader from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|ConditionDetails/ProjectHeader', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    spy = jest.fn();
  });

  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectHeader
          selectedProject="Keystone XL"
          toggleExpanded={spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(ProjectHeader, () => wrapper);

    test('should open the Company Modal', () => {
      wrapper.find('.ProjectHeader')
        .find('.openProject')
        .simulate('click', eventFuncs);

      expect(wrapper.find(CompanyPopup).prop('isOpen')).toEqual(true);
    });
  });

  describe('expandable', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProjectHeader
          selectedProject="Keystone XL"
          toggleExpanded={spy}
          isExpandable
        />,
      );
    });

    test('should call its toggleExpanded callback', () => {
      wrapper.find('.ProjectHeader')
        .find('.toggleExpand')
        .simulate('click', eventFuncs);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
