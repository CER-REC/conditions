import React from 'react';
import PropTypes from 'prop-types';

const dotWidth = 16;
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
const CompanyFlag = (flagLayout) => {
  // Our reference point is the top of the flagpole
  const x = 0;
  const y = flagLayout[0].length;

  const circleCoords = flagLayout.reduce((coords, columnDots, columnIndex) => {
    // x for each column is half a space over, including padding between the circles
    const columnOffset = columnIndex * (dotWidth / 2);
    const columnX = x - columnOffset;
    const columnY = y + columnOffset;

    columnDots.split("").forEach((dot, dotIndex) => {
      const dotY = columnY + (dotIndex * dotWidth);
      if (parseInt(dot, 2)&1) {
        // Placeholder color for now, these will be ProjectDots at some point anyway
        coords.push({ x: columnX, y: dotY, color: 'grey' });
      };
    });

    return coords;
  }, []);

  return (
    <g>
      {...circles}
    </g>
  );
};

CompanyFlag.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default CompanyFlag;
