import React from 'react';
import PropTypes from 'prop-types';
import Control from '../../Control';

import './styles.scss';

class StackGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isDragging = false;
  }

  setControlBool = () => {
    const showControl = true;
    return showControl;
  }

  getConditionDates = () => {
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
    const dateCount = this.props.projectData[0].graphData.map(k => k.date).length - 1;
    return dateCount;
  }

  getChartWidth = () => {
    const groupWidth = 350;
    return groupWidth;
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

    const prevPosition = this.props.positionControl;

    const direction = (event.key === 'ArrowRight' || event.keyCode === 39) ? 1 : -1;

    const positionControl = prevPosition + (direction * this.getSectionWidth());
    if (positionControl < 0 || positionControl > this.getChartWidth()) {
      return;
    }

    const numOfConditionValue = this.getConditionDates();
    const previousSection = prevPosition / this.getSectionWidth();

    const numOfConditions = numOfConditionValue[Math.round(previousSection) + direction];

    const yHeight = '20';

    this.props.onChange(positionControl, numOfConditions, this.setControlBool(), yHeight);
  };

  getClosestYear = (event) => {
    const groupPosition = event.target.getClientRects()[0];
    const renderedWidth = groupPosition.right - groupPosition.left;
    const scale = renderedWidth / this.getChartWidth();

    const clickArea = (event.clientX - groupPosition.x) / scale;
    const currentSection = Math.floor(
      (clickArea + (this.getSectionWidth() / 2))
    / this.getSectionWidth(),
    );

    const positionControl = (this.getSectionWidth() * currentSection);

    return [positionControl, currentSection];
  };

  onDragStart = (event) => {
    this.isDragging = true;
    this.onDragMove(event);
  }

  onDragMove = (event) => {
    if (this.isDragging === false) { return; }
    event.stopPropagation();

    const [positionControl, currentSection] = this.getClosestYear(event);
    const numOfConditionValue = this.getConditionDates();
    const numOfConditions = numOfConditionValue[currentSection];

    const yHeight = '20';

    this.props.onChange(positionControl, numOfConditions, this.setControlBool(), yHeight);
  }

  onDragStop = (event) => {
    event.stopPropagation();
    this.isDragging = false;
  }

  onClick = (event) => {
    // document.addEventListener('click', this.handleOutsideClick, false);
    event.stopPropagation();

    const [positionControl, currentSection] = this.getClosestYear(event);

    const numOfConditionValue = this.getConditionDates();
    const numOfConditions = numOfConditionValue[currentSection];

    const renderedChartHeight = 270;
    const controlMaxHeight = 220;
    const scale = controlMaxHeight / renderedChartHeight; // 0.81

    // const yHeight = ((numOfConditions / scale) * 2) + 40

    // max 684

    // const currentSection = Math.floor(
    //   (clickArea + (this.getSectionWidth() / 2))
    // / this.getSectionWidth(),
    // );

    // const positionControl = (this.getSectionWidth() * currentSection);

    let yHeight = '0'; // max height is 220 : min = 0

    if (numOfConditions === 25) {
      yHeight = '210';
    } else if (numOfConditions === 65) {
      yHeight = '200';
    } else if (numOfConditions === 103) {
      yHeight = '185';
    } else if (numOfConditions === 136) {
      yHeight = '175';
    } else if (numOfConditions === 310) {
      yHeight = '125';
    } else if (numOfConditions === 437) {
      yHeight = '85';
    } else if (numOfConditions === 567) {
      yHeight = '45';
    } else if (Math.max(...numOfConditionValue) === numOfConditions) {
      yHeight = '15';
    }

    this.props.onChange(
      positionControl,
      numOfConditions,
      this.setControlBool(),
      yHeight,
    );
  }

  handleOutsideClick = (event) => {
    // if (!this.node.contains(event.target)) {
    //   const showControl = false;
    //   this.props.onChange(showControl);
    // }
  }

  render() {
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
        {!this.props.showControl ? null : (
          <Control
            positionControl={`translate(${this.props.positionControl + 50}, 30)`}
            numOfConditionsLabel={this.props.numOfConditions}
            yHeight={this.props.yHeight}
            controlTextValue={this.props.controlTextValue}
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
  projectData: PropTypes.arrayOf(PropTypes.shape({
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  yHeight: PropTypes.string,
};

StackGroup.defaultProps = {
  children: null,
  yHeight: '20',
};

export default StackGroup;
