import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import StackGroup from '.';

const positionControl = 'translate(30, 30)';
const numOfConditions = 213;
const yHeight = '20';
const onDragStart = () => {};
const onDragMove = () => {};
const onDragStop = () => {};
const handleOnChange = () => {};
const handleArrowKey = () => {};
const children = () => {};
const showControl = true;

describe('Components|Streamgraph/StackGroup', () => {
  describe('with props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
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

    it('should not call onChange if mouseMove is fired before mouseDown');
    it('should call onChange with the correct position when using mouseMove');
    it('should call onChange with the correct position when clicking');
    it('should show the control at the first year the first time it is tabbed to');
  });
});
