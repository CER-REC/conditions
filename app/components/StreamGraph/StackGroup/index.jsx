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
    const size = this.sizeRef.current.getClientRects();
    /* eslint-disable object-curly-newline */
    const { top, left, width, height } = size[0];
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

  setControlBool = () => {
    const showControl = true;
    return showControl;
  }

  getConditionDates = () => this.props.projectData.reduce((acc, next) => {
    next.graphData.forEach((v) => {
      if (!acc[v.date]) { acc[v.date] = 0; }
      acc[v.date] += v.count;
    });
    return acc;
  }, {});

  getDateCount = () => {
    const [min, max] = this.props.stackProps.domain.x;
    return max - min;
  }

  getChartWidth = () => {
    const { width } = this.calculateStackSize();
    return width;
  }

  getSectionWidth = () => {
    const sectionWidth = this.getChartWidth() / this.getDateCount();
    return sectionWidth;
  }

  handleArrowKey = (event) => {
    if ((event.key !== 'ArrowLeft' || event.keyCode !== 37)
      && (event.key !== 'ArrowRight' || event.keyCode !== 39)) {
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

  handleOutsideClick = (event) => {
    // TODO: Reimplement this
    // TODO: Change this.node to this.sizeRef
    if (this.node && !this.node.contains(event.target)) {
      const showControl = false;
      this.props.onChange(showControl);
    }
  }

  render() {
    const { stackProps, controlYear } = this.props;

    let control = null;
    if (controlYear) {
      const xPos = stackProps.scale.x(controlYear);
      const dateValues = this.getConditionDates();
      const yBottom = stackProps.height - stackProps.padding.bottom;
      const yTop = stackProps.scale.y(dateValues[controlYear]);
      control = (
        <ChartIndicator
          x={xPos}
          yTop={yTop}
          yBottom={yBottom}
          label={dateValues[controlYear]}
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
      y: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

StackGroup.defaultProps = {
  children: null,
  controlYear: null,
};

export default StackGroup;
