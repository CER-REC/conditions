import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StackGroup from '.';

const positionControl = 'translate(30, 30)';
const numOfConditions = 213;
const yHeight = '20';
const controlTopBaseline = '10';
const onDragStart = () => {};
const onDragMove = () => {};
const onDragStop = () => {};
const handleOnChange = () => {};
const handleArrowKey = () => {};
const children = () => {};
let showControl = true;

describe('Components|Streamgraph/StackGroup', () => {
  describe('with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <StackGroup
          handleOnChange={handleOnChange}
          handleArrowKey={handleArrowKey}
          showControl={showControl}
          positionControl={positionControl}
          numOfConditions={numOfConditions}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onDragStop={onDragStop}
          yHeight={yHeight}
          controlTopBaseline={controlTopBaseline}
        >
        children={children}
        </StackGroup>,
      );
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal(('g'));
    });

    it('should show the Control when showControl is true', () => {
      expect(wrapper.find('Control').exists()).to.equal(true);
    });

    it('should not show the Control when showControl is false', () => {
      showControl = false;
      wrapper = shallow(
        <StackGroup
          showControl={showControl}
        >
        children={children}
        </StackGroup>,
      );
      expect(wrapper.find('Control').exists()).to.equal(false);
    });
  });
});
