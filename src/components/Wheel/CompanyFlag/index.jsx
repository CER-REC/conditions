import React from 'react';
import PropTypes from 'prop-types';
import ProjectDot from '../ProjectDot';

const CompanyFlag = ({ flagLayout, dotWidth, dotSpacing, x, y, height }) => {
  const baseY = y + height - (flagLayout[0].length * dotSpacing);

  const columnOffset = {
    x: dotSpacing * Math.sin(Math.PI / 3),
    y: dotSpacing / 2,
  };

  const circles = flagLayout.reduce((out, columnDots, columnIndex) => {
    const columnX = -(columnIndex * columnOffset.x);
    const columnY = baseY + (columnIndex * columnOffset.y);

    columnDots.forEach((dot, dotIndex) => {
      const dotY = columnY + (dotIndex * dotSpacing);

      if (dot) {
        out.push({
          cx: x + columnX,
          cy: y + dotY,
          r: dotWidth / 2,
          filtered: dot.filtered,
          relevant: dot.relevant,
        });
      }
    });

    return out;
  }, []);

  return (
    <g>
      {circles.map(circle => (<ProjectDot key={`${circle.cx},${circle.cy}`} {...circle} />))}
    </g>
  );
};

CompanyFlag.propTypes = {
  // TODO: flagLayout shape has changed
  flagLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number.isRequired,
  // width: PropTypes.number.isRequired,
  dotWidth: PropTypes.number,
  dotSpacing: PropTypes.number,
};

CompanyFlag.defaultProps = {
  x: 0,
  y: 0,
  dotWidth: 16,
  dotSpacing: 24,
};

export default CompanyFlag;
