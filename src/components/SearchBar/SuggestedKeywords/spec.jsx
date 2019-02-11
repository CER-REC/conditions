import React from 'react';
import { shallow } from 'enzyme';
import SuggestedKeywords from '.';
import './styles.scss';

describe('Components|BubbleChart', () => {
  describe('onDrag', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow();
    });

    test(
      'should not update indicator position if mouseMove without mouseDown',
      () => {
        // Get props for onDragMove and check the state x position
        const mouseDrag = {
          clientX: 50,
        };
        wrapper.find('g').props().onMouseMove(mouseDrag);
        expect(wrapper.state().indicator).toBeNull();
      },
    );
  });
});
