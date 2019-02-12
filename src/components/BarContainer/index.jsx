import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Bar from './Bar';
import './styles.scss';

const BarContainer = (props) => {
  const { items } = props;
  if (items.length === 0) { return null; }
  const {
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
  if (scale) { barContainerWidth *= scale; }
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
  desc: PropTypes.string,
  title: PropTypes.string,
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
<<<<<<< HEAD:src/components/BarContainer/index.jsx
  maxValue: 1,
=======
  maxWidth: false,
>>>>>>> 7de059f49bed8f569104fd8b77fd89018059dad6:app/components/BarContainer/index.jsx
};
export default BarContainer;
