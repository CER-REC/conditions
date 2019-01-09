import React from 'react';
import PropTypes from 'prop-types';
import Control from '../../Control';

import './styles.scss';

class StackGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isDragging = false;
  }

  getConditionDates() {
    let conditionDates = this.props.projectData.reduce((acc, next) => {
      next.graphData.forEach((v) => {
        if (!acc[v.date]) { acc[v.date] = 0; }
        acc[v.date] += v.count;
      });
      return acc;
    }, {});
    conditionDates = Object.values(conditionDates);
    return conditionDates;
  }

  getDateCount = () => {
    const dateCount = this.props.projectData[0].graphData.map(k => k.date).length;
    return dateCount;
  }

  handleArrowKey = (event) => {
    if ((event.key !== 'ArrowLeft' || event.keyCode !== 37) && (event.key !== 'ArrowRight' || event.keyCode !== 39)) {
      return;
    }

    const showControl = true;
    const prevPosition = this.props.positionControl;

    const groupPosition = event.target.getClientRects()[0];
    const renderedWidth = groupPosition.right - groupPosition.left;
    const groupWidth = 350;
    const scale = renderedWidth / groupWidth; // 1.333

    const sectionWidth = groupWidth / this.getDateCount();

    const direction = (event.key === 'ArrowRight' || event.keyCode === 39) ? 1 : -1;

    const positionControl = prevPosition + (direction * sectionWidth);
    console.log(prevPosition, sectionWidth, direction);
    if (positionControl < 0 || positionControl > groupWidth) {
      return;
    }
    console.log(positionControl);

    const numOfConditionValue = this.getConditionDates();
    const previousSection = prevPosition / sectionWidth;
    const numOfConditions = numOfConditionValue[Math.round(previousSection) + direction];

    this.props.onChange(positionControl, numOfConditions, showControl);
  };

  getClosestYear = (event) => {
    const groupPosition = event.target.getClientRects()[0];
    const renderedWidth = groupPosition.right - groupPosition.left;
    const groupWidth = 350;
    const scale = renderedWidth / groupWidth;

    const sectionWidth = groupWidth / (this.getDateCount() - 1);

    const clickArea = (event.clientX - groupPosition.x) / scale;
    const currentSection = Math.floor((clickArea + (sectionWidth / 2)) / sectionWidth);

    const positionControl = (sectionWidth * currentSection);

    return [positionControl, currentSection];
  };

  onDragStart = (event) => {
    this.isDragging = true;
    this.onDragMove(event);
  }

  onDragMove = (event) => {
    if (this.isDragging === false) { return; }
    event.stopPropagation();
    const showControl = true;
    const [positionControl, currentSection] = this.getClosestYear(event);
    const numOfConditionValue = this.getConditionDates();
    const numOfConditions = numOfConditionValue[currentSection];
    this.props.onChange(positionControl, numOfConditions, showControl);
  }

  onDragStop = (event) => {
    event.stopPropagation();
    this.isDragging = false;
  }

  onClick = (event) => {
    // document.addEventListener('click', this.handleOutsideClick, false);
    event.stopPropagation();

    const [positionControl, currentSection] = this.getClosestYear(event);

    const showControl = true;
    const numOfConditionValue = this.getConditionDates();
    const numOfConditions = numOfConditionValue[currentSection];

    this.props.onChange(positionControl, numOfConditions, showControl);
  }

  handleOutsideClick = (event) => {
    // if (!this.node.contains(event.target)) {
    //   const showControl = false;
    //   this.props.onChange(showControl);
    // }
  }

  render() {

    const offset = 50;
    const sectionWidth = 50;
    const guides = [];
    for (var i = 0; i < 8; i++) {
      guides.push(<line
        key={`test-${i}`}
        strokeDasharray="4.051 4.051"
        x1={offset + (sectionWidth * i)}
        x2={offset + (sectionWidth * i)}
        y1="0"
        y2="320"
        stroke="rgb(209, 5, 122)"
        strokeWidth="1"
      />)
    }
    return (
      <g
        ref={(node) => { this.node = node; }}
        className="StackGroup"
        onClick={this.onClick}
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
        {guides}
        {!this.props.showControl ? null : (
          <Control
            positionControl={`translate(${this.props.positionControl + 50}, 30)`}
            numOfConditionsLabel={this.props.numOfConditions}
            yHeight={this.props.yHeight}
            controlTopBaseline={this.props.controlTopBaseline}
          />
        )}
      </g>
    );
  }
}

StackGroup.propTypes = {
  children: PropTypes.node,
  showControl: PropTypes.bool.isRequired,
  numOfConditions: PropTypes.number.isRequired,
  positionControl: PropTypes.number.isRequired,
  yHeight: PropTypes.string.isRequired,
  controlTopBaseline: PropTypes.string.isRequired,
  projectData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

StackGroup.defaultProps = {
  children: null,
};

export default StackGroup;
