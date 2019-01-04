import React from 'react';
import PropTypes from 'prop-types';
import Control from '../../Control';

import './styles.scss';

const StackGroup = props => (
  <g
    onClick={props.handleOnChange}
    onKeyDown={props.handleArrowKey}
    onMouseDown={props.onDragStart}
    onMouseMove={props.onDragMove}
    onMouseUp={props.onDragStop}
    onTouchStart={props.onDragStart}
    onTouchMove={props.onDragMove}
    onTouchEnd={props.onDragStop}
    role="button"
    tabIndex="-1"
  >
    {props.children}
    {!props.showControl ? null : (
      <Control
        positionControl={`translate(${props.positionControl}, 30)`}
        numOfConditionsLabel={props.numOfConditions}
        yHeight={props.yHeight}
        controlTopBaseline={props.controlTopBaseline}
      />
    )}
  </g>
);

StackGroup.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleArrowKey: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  showControl: PropTypes.bool.isRequired,
  positionControl: PropTypes.number.isRequired,
  numOfConditions: PropTypes.number.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragMove: PropTypes.func.isRequired,
  onDragStop: PropTypes.func.isRequired,
  yHeight: PropTypes.string.isRequired,
  controlTopBaseline: PropTypes.string.isRequired,
};

export default StackGroup;
