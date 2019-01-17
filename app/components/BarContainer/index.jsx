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
  const barContainerHeight = vert ? barContainerMaxHeight : size * scale;
  const bars = items.map((bar, index) => {
    if (vert) {
      barContainerWidth = size * (index + 1);
      return (
        <Bar
          key={index.toString()}
          {...bar}
          x={size * index * scale}
          y={barContainerMaxHeight - bar.value * scale}
          width={size * scale}
          height={bar.value * scale}
        />);
    }
    const singleBar = (
      <Bar
        key={index.toString()}
        {...bar}
        x={barContainerWidth * scale}
        y={0}
        width={bar.value * scale}
        height={barContainerHeight}
      />);
    barContainerWidth += bar.value;
    return singleBar;
  });
  if (scale) { barContainerWidth *= scale; }
  const Container = standalone
    ? (
      <g className="BarContainer" width={barContainerWidth} height={barContainerHeight}>
        <title>{title}</title>
        <desc>{desc}</desc>
        {bars}
      </g>)
    : (
      <svg className="BarContainer" width={barContainerWidth} height={barContainerHeight}>
        <title>{title}</title>
        <desc>{desc}</desc>
        {bars}
      </svg>
    );
  return Container;
};

BarContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  desc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  vert: PropTypes.bool,
  scale: PropTypes.number,
  standalone: PropTypes.bool,
  size: PropTypes.number.isRequired,
};

BarContainer.defaultProps = {
  vert: false,
  scale: 1,
  standalone: false,
};
export default BarContainer;
