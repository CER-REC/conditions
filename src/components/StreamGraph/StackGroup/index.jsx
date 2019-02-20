import React from 'react';
import PropTypes from 'prop-types';
import ChartIndicator from '../../ChartIndicator';

import './styles.scss';

class StackGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isDragging = false;
    this.sizeRef = React.createRef();
  }

  calculateStackSize = () => {
    const { stackProps } = this.props;
    const { padding } = stackProps;
    return {
      top: padding.top,
      left: padding.left,
      width: stackProps.width - padding.left - padding.right,
      height: stackProps.height - padding.top - padding.bottom,
    };
  };

  calculateRenderedSize = () => {
    const size = this.sizeRef.current
      ? this.sizeRef.current.getClientRects()[0]
      : this.calculateStackSize();
    /* eslint-disable object-curly-newline */
    const { top, left, width, height } = size;
    return { top, left, width, height };
    /* eslint-enable object-curly-newline */
  };

  calculateScaledMousePosition = (e) => {
    const stackSize = this.calculateStackSize();
    const renderedSize = this.calculateRenderedSize();
    const scale = {
      x: renderedSize.width / stackSize.width,
      y: renderedSize.height / stackSize.height,
    };
    return {
      x: (e.clientX - renderedSize.left) / scale.x,
      y: (e.clientY - renderedSize.top) / scale.y,
    };
  };

  getSectionWidth = () => {
    const { width } = this.calculateStackSize();
    const [min, max] = this.props.stackProps.domain.x;
    // Divide the width of the chart by (lastYear - firstYear)
    return width / (max - min);
  }

  handleArrowKey = (event) => {
    if ((event.key !== 'ArrowLeft' && event.keyCode !== 37)
      && (event.key !== 'ArrowRight' && event.keyCode !== 39)) {
      return;
    }

    const direction = (event.key === 'ArrowRight' || event.keyCode === 39) ? 1 : -1;

    const { x: xDomain } = this.props.stackProps.domain;
    const prevYear = this.props.controlYear
      || (direction === -1 ? xDomain[0] : xDomain[1]);
    let newYear = prevYear + direction;
    if (newYear < xDomain[0] || newYear > xDomain[1]) {
      newYear = prevYear;
    }
    this.props.onChange(newYear);
  };

  onDragStart = (event) => {
    this.isDragging = true;
    this.onDragMove(event);
  }

  onDragMove = (event) => {
    if (this.isDragging === false) { return; }
    event.stopPropagation();

    const clickArea = this.calculateScaledMousePosition(event);
    const sectionWidth = this.getSectionWidth();
    const currentSection = Math.floor((clickArea.x + (sectionWidth / 2)) / sectionWidth);
    const closestYear = this.props.stackProps.domain.x[0] + currentSection;
    this.props.onChange(closestYear);
  }

  onDragStop = (event) => {
    event.stopPropagation();
    this.isDragging = false;
  }

  onFocus = () => {
    this.props.onChange(this.props.stackProps.domain.x[0]);
  }

  render() {
    const { stackProps, controlYear } = this.props;

    let control = null;
    if (controlYear) {
      const xPos = stackProps.scale.x(controlYear);
      // Count the number of conditions across all streams for the selected year
      const conditionCount = this.props.projectData
        .reduce((acc, next) => (acc + (next.graphData[controlYear] || 0)), 0);

      const yBottom = stackProps.height - stackProps.padding.bottom;
      const yTop = stackProps.scale.y(conditionCount);
      control = (
        <ChartIndicator
          x={xPos}
          yTop={yTop}
          yBottom={yBottom}
          label={conditionCount}
        />
      );
    }

    return (
      <React.Fragment>
        <g
          ref={this.sizeRef}
          className="StackGroup"
          onKeyDown={this.handleArrowKey}
          onMouseDown={this.onDragStart}
          onMouseMove={this.onDragMove}
          onMouseUp={this.onDragStop}
          onTouchStart={this.onDragStart}
          onTouchMove={this.onDragMove}
          onTouchEnd={this.onDragStop}
          onFocus={this.onFocus}
          role="button"
          tabIndex="0"
        >
          {this.props.children}
        </g>
        {control}
      </React.Fragment>
    );
  }
}

StackGroup.propTypes = {
  children: PropTypes.node,
  controlYear: PropTypes.number,
  projectData: PropTypes.arrayOf(PropTypes.shape({
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  stackProps: PropTypes.shape({
    domain: PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    scale: PropTypes.shape({
      x: PropTypes.func.isRequired,
      y: PropTypes.func.isRequired,
    }).isRequired,
    padding: PropTypes.shape({
      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
    }).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

StackGroup.defaultProps = {
  children: null,
  controlYear: null,
};

export default StackGroup;
