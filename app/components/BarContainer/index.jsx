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
        // eslint-disable-next-line react/no-array-index-key
          key={index}
          {...bar}
          x={size * index * scale}
          y={barContainerMaxHeight - bar.value * scale}
          width={size * scale}
          height={bar.value * scale}
        />
      );
    }
    const singleBar = (
      <Bar
    // eslint-disable-next-line react/no-array-index-key
        key={index}
        {...bar}
        x={barContainerWidth * scale}
        y={0}
        width={bar.value * scale}
        height={barContainerHeight}
      />
    );
    barContainerWidth += bar.value;
    return singleBar;
  });
  if (scale) { barContainerWidth *= scale; }
  const content = (
    <g className="BarContainer" width={barContainerWidth} height={barContainerHeight}>
      <title>{title}</title>
      <desc>{desc}</desc>
      {bars}
    </g>
  );
  if (standalone) { return content; }
  return (
    <svg className="BarContainer" width={barContainerWidth} height={barContainerHeight}>
      {content}
    </svg>
  );
};

BarContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  desc: PropTypes.string,
  title: PropTypes.string,
  vert: PropTypes.bool,
  scale: PropTypes.number,
  standalone: PropTypes.bool,
  size: PropTypes.number.isRequired,
};

BarContainer.defaultProps = {
  vert: false,
  scale: 1,
  standalone: false,
  desc: '',
  title: '',
};
export default BarContainer;
