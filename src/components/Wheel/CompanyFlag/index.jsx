import React from 'react';
import PropTypes from 'prop-types';
import ProjectDot from '../ProjectDot';

/*

  111
  _____ is relevant
   ____ is filtered
    ___ is a dot

                x
              x
            x   x
          x   x
            x   x
              x
                x

                x

                x

                x

  ['1111111', '131', '15', '1']

                x
              x
            x   x
          x
            x   x
              x
                x

                x

                x

                x

  ['1111111', '301', '11', '5']

  - Each column's top is half a space left, half a space down from the previous column
*/

// Returns a <g>?

const CompanyFlag = ({ flagLayout, dotWidth, dotSpacing }) => {
  // Our reference point is the top of the flagpole
  const x = 0;
  const y = flagLayout[0].length;

  const columnOffset = {
    x: dotSpacing * Math.sin(Math.PI / 3),
    y: dotSpacing / 2,
  };

  const circleCoords = flagLayout.reduce((coords, columnDots, columnIndex) => {
    const columnX = x - (columnIndex * columnOffset.x);
    const columnY = y + (columnIndex * columnOffset.y);

    columnDots.split('').forEach((dot, dotIndex) => {
      const dotY = columnY + (dotIndex * dotSpacing);
      // eslint-disable-next-line no-bitwise
      if (parseInt(dot, 2) & 1) {
        // Placeholder color for now, these will be ProjectDots at some point anyway
        coords.push({ x: columnX, y: dotY, color: 'grey' });
      }
    });

    return coords;
  }, []);

  const circles = circleCoords.map(coords => (
    <ProjectDot
      key={`${coords.x},${coords.y}`}
      cx={coords.x + 64}
      cy={coords.y}
      r={dotWidth / 2}
    />
  ));

  return (
    <g>
      {circles}
    </g>
  );
};

CompanyFlag.propTypes = {
  flagLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  dotWidth: PropTypes.number.isRequired,
  dotSpacing: PropTypes.number.isRequired,
};

export default CompanyFlag;
