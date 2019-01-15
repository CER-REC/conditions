import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar';
import './styles.scss';

// Possible factor into class component to have scale() function

const BarContainer = (props) => {
  if (props.items.length === 0) { return null; }
  const className = 'BarContainer';
  const maximumVerticalBarHeight = props.scale * Math.max(...props.items.map(({ value }) => value));

  let barContainerWidth = 0;

  let barContainerHeight = props.vert
    ? maximumVerticalBarHeight * props.scale
    : props.size * props.scale;

  const Bars = props.items.map((bar, index) => {
    const y = props.vert
      ? maximumVerticalBarHeight - bar.value * props.scale
      : 0;

    const x = props.vert
      ? props.size * index * props.scale
      : barContainerWidth * props.scale;

    const height = props.vert
      ? bar.value * props.scale
      : barContainerHeight * props.scale;

    const width = props.vert
      ? props.size * props.scale
      : bar.value * props.scale;

    const Item = (
      <Bar
        {...bar}
        x={x}
        y={y}
        width={width}
        height={height}
      />);
    barContainerWidth += bar.value;
    if (props.vert) barContainerHeight = maximumVerticalBarHeight;
    if (props.vert) barContainerWidth = props.size * (index + 1);
    return Item;
  });

  if (props.scale) barContainerWidth *= props.scale;

  const Container = !props.standalone
    ? (
      <div
        className={className}
        style={{
          height: barContainerHeight,
          width: barContainerWidth,
        }}
      >
        <svg width={barContainerWidth} height={barContainerHeight}>
          <title>{props.title}</title>
          <desc>{props.desc}</desc>
          {Bars}
        </svg>
      </div>)
    : (
      <g className={className} width={barContainerWidth} height={barContainerHeight}>
        <title>{props.title}</title>
        <desc>{props.desc}</desc>
        {Bars}
      </g>);
  return Container;
};

BarContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  desc: PropTypes.string,
  title: PropTypes.string,
  vert: PropTypes.bool,
  scale: PropTypes.number,
  standalone: PropTypes.bool,
  size: PropTypes.number.isRequired,
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
