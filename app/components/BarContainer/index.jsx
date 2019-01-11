import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar';
import './styles.scss';

const BarContainer = (props) => {
  if (props.items.length === 0) { return null; }
  let barContainerWidth = 0;
  let barContainerHeight = 0;

  const maximumVerticalBarHeight = Math.max(...props.items.map((bar) => {
    const { height } = bar; return height;
  }));

  barContainerHeight = props.vert
    ? barContainerHeight = maximumVerticalBarHeight
    : barContainerHeight = props.value;

  const Bars = props.items.map((bar) => {
    const barY = props.vert
      ? maximumVerticalBarHeight - bar.height
      : props.value;
    const Item = <Bar {...bar} x={barContainerWidth} y={barY} />;
    barContainerWidth += bar.width;
    if (bar.height >= barContainerHeight) barContainerHeight = bar.height;
    return Item;
  });

  const Container = !props.standalone
    ? (
      <div className="BarContainer" style={{ height: barContainerHeight, width: barContainerWidth }}>
        <svg width={barContainerWidth} height={barContainerHeight}>
          <title>{props.title}</title>
          <desc>{props.desc}</desc>
          {Bars}
        </svg>
      </div>)
    : (
      <>
        <g width={barContainerWidth} height={barContainerHeight}>
          <title>{props.title}</title>
          <desc>{props.desc}</desc>
          {Bars}
        </g>
      </>);
  return Container;
};

BarContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  desc: PropTypes.string,
  title: PropTypes.string,
  vert: PropTypes.bool,
  scale: PropTypes.number,
  standalone: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

BarContainer.defaultProps = {
  items: [],
  desc: '',
  title: '',
  vert: false,
  scale: 1,
  standalone: false,
};
export default BarContainer;
