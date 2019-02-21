import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Bar from './Bar';
import './styles.scss';

const BarContainer = (props) => {
  if (props.items.length === 0) { return null; }

  const {
    items,
    scale,
    maxWidth,
    vert,
    size,
    standalone,
    title,
    desc,
    maxValue,
  } = props;

  let barContainerWidth = 0;
  const barContainerMaxHeight = maxWidth || scale * Math.max(...items.map(({ value }) => value));
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
          y={barContainerMaxHeight - (bar.value * maxValue) * scale}
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
        width={(bar.value * maxValue) * scale}
        height={barContainerHeight}
      />
    );
    barContainerWidth += bar.value * maxValue;
    return singleBar;
  });
  if (scale && scale !== 1) { barContainerWidth *= scale; }
  const content = (
    <g className={classNames('BarContainer', props.className)} width={barContainerWidth} height={barContainerHeight}>
      <title>{title}</title>
      <desc>{desc}</desc>
      {bars}
    </g>
  );
  if (standalone) { return content; }
  return (
    <svg className={classNames('BarContainer', props.className)} width={barContainerWidth} height={barContainerHeight}>
      {content}
    </svg>
  );
};

BarContainer.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  vert: PropTypes.bool,
  maxValue: PropTypes.number,
  scale: PropTypes.number,
  standalone: PropTypes.bool,
  size: PropTypes.number.isRequired,
  maxWidth: PropTypes.number,
};

BarContainer.defaultProps = {
  className: '',
  vert: false,
  scale: 1,
  standalone: false,
  maxWidth: 0,
  maxValue: 1,
};
export default BarContainer;
