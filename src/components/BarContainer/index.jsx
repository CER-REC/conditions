import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BarContainer = (props) => {
  if (props.items.length === 0) { return null; }

  const {
    items,
    vertical,
    standalone,
    ...spreadProps
  } = props;

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
          x={`${x - width}%`}
          y={`${100 - height}%`}
          width={`${width}%`}
          height={`${height}%`}
        />
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
      />
    );
  });

  const Container = standalone ? 'g' : 'svg';
  return (
    <Container
      width="100%"
      height="100%"
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
};

BarContainer.defaultProps = {
  className: '',
  vertical: false,
  standalone: false,
};

export default BarContainer;
