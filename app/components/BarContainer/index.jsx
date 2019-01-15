import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar';
import './styles.scss';

const BarContainer = (props) => {
  const { items } = props;
  if (items.length === 0) { return null; }
  const {
    scale,
    vert,
    size,
    standalone,
    title,
    desc,
  } = props;
  let barContainerWidth = 0;
  const barContainerMaxHeight = scale * Math.max(...items.map(({ value }) => value));
  const barContainerHeight = vert ? barContainerMaxHeight * scale : size * scale;
  const bars = items.map((bar, index) => {
    let singleBar;
    if (vert) {
      barContainerWidth = size * (index + 1);
      singleBar = (
        <Bar
          {...bar}
          x={size * index * scale}
          y={barContainerMaxHeight - bar.value * scale}
          width={size * scale}
          height={bar.value * scale}
        />);
      return singleBar;
    }
    singleBar = (
      <Bar
        {...bar}
        x={barContainerWidth * scale}
        y={0}
        width={bar.value * scale}
        height={barContainerHeight * scale}
      />);
    barContainerWidth += bar.value;
    return singleBar;
  });
  if (scale) barContainerWidth *= scale;
  const Container = standalone
    ? (
      <g className="BarContainer" width={barContainerWidth} height={barContainerHeight}>
        <title>{title}</title>
        <desc>{desc}</desc>
        {bars}
      </g>)
    : (
      <div
        className="BarContainer"
        style={{
          height: barContainerHeight,
          width: barContainerWidth,
        }}
      >
        <svg width={barContainerWidth} height={barContainerHeight}>
          <title>{title}</title>
          <desc>{desc}</desc>
          {bars}
        </svg>
      </div>);
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
