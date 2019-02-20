import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ProjectHeader from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|ConditionDetails/Details', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;

    beforeEach(() => {
      spy = jest.fn();

      wrapper = shallow(
        <ProjectHeader
          selectedProject="Keystone XL"
          openProjectDetails={spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(ProjectHeader, () => wrapper);

    test('should call its openProjectDetails callback', () => {
      wrapper.find('.ProjectHeader')
        .find('.openProject')
        .simulate('click', eventFuncs);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
