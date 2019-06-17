import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import invariant from 'invariant';

const isValidUnit = (unit) => {
  // Must be a number or a string
  if (typeof unit !== 'number' && typeof unit !== 'string') { return false; }
  // Number or a string that is actually a number
  if (typeof unit === 'number' || parseInt(unit, 10).toString() === unit) { return true; }
  // Ends with % or px
  if (unit.endsWith('%') || unit.endsWith('px')) { return true; }
  return false;
};

const calculateSize = (size, max) => {
  const value = parseInt(max, 10) * size / 100;
  return (max.toString().endsWith('%')) ? `${value}%` : value;
};

const BarContainer = (props) => {
  if (props.items.length === 0) { return null; }

  const {
    items,
    vertical,
    standalone,
    ...spreadProps
  } = props;

  // Pull these out separately since we still want to pass them through
  const { width: maxWidth, height: maxHeight } = props;

  invariant(
    isValidUnit(maxWidth),
    `BarContainer only supports width units of number, %, or px. Received ${maxWidth}`,
  );
  invariant(
    isValidUnit(maxHeight),
    `BarContainer only supports height units of number, %, or px. Received ${maxHeight}`,
  );

  const scaleAgainst = vertical
    ? Math.max(...items.map(v => v.value))
    : items.reduce((acc, next) => acc + next.value, 0);

  let x = 0;
  const bars = items.map((bar, index) => {
    if (vertical) {
      const width = 1 / items.length * 100;
      const height = bar.value / scaleAgainst * 100;
      x += width;
      return (
        <rect
          className="Bar"
          key={index /* eslint-disable-line react/no-array-index-key */}
          fill={bar.fill}
          x={calculateSize(x - width, maxWidth)}
          y={calculateSize(100 - height, maxHeight)}
          width={calculateSize(width, maxWidth)}
          height={calculateSize(height, maxHeight)}
        >
          <title>{bar.description}</title>
        </rect>
      );
    }

    const width = bar.value / scaleAgainst * 100;
    x += width;
    return (
      <rect
        className="Bar"
        key={index /* eslint-disable-line react/no-array-index-key */}
        fill={bar.fill}
        x={`${x - width}%`}
        y={0}
        width={`${width}%`}
        height="100%"
      >
        <title>{bar.description}</title>
      </rect>
    );
  });

  const Container = standalone ? 'g' : 'svg';
  return (
    <Container
      {...spreadProps}
      className={classNames('BarContainer', props.className)}
    >
      {bars}
    </Container>
  );
};

BarContainer.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
  })).isRequired,
  vertical: PropTypes.bool,
  standalone: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

BarContainer.defaultProps = {
  className: '',
  vertical: false,
  standalone: false,
  width: '100%',
  height: '100%',
};

export default BarContainer;
