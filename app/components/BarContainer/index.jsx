import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar';
import './styles.scss';

const BarContainer = (props) => {
  if (props.items.length === 0) { return null; }
  let barWidth = 0;
  let barHeight = 0;
  const heights = props.items.map((item) => { return item.height; });
  const barMax = Math.max(...heights);
  const Bars = props.items.map((item) => {
    const barY = barMax - item.height;
    const Item = <Bar {...item} x={barWidth} y={barY} />;
    barWidth += item.width;
    if (item.height >= barHeight) barHeight = item.height;
    return Item;
  });
  return (
    <div className="BarContainer" style={{ height: barHeight, width: barWidth }}>
      <svg width={barWidth} height={barHeight}>
        <title>{props.title}</title>
        <desc>{props.desc}</desc>
        {Bars}
      </svg>
    </div>);
};

BarContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  desc: PropTypes.string,
  title: PropTypes.string,
};

BarContainer.defaultProps = {
  items: [],
  desc: '',
  title: '',
};
export default BarContainer;
