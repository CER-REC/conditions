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

*/

// const parseFlags = (dot) => {
//   const parsed = parseInt(dot, 10);
//   // eslint-disable-next-line no-bitwise
//   return [!!(parsed & 1), !!(parsed & 2), !!(parsed & 4)];
// };

const bits = [
  ['isDot', 1],
  ['isFiltered', 2],
  ['isRelevant', 4],
];

const parseFlags = (dot) => {
  const parsed = parseInt(dot, 10);
  return bits.reduce((flags, [key, bit]) => {
    // eslint-disable-next-line no-param-reassign, no-bitwise
    flags[key] = !!(parsed & bit);
    return flags;
  }, []);
};

const CompanyFlag = ({ flagLayout, dotWidth, dotSpacing, x, y, width, height }) => {
  const baseY = y + height - (flagLayout[0].length * dotSpacing);

  // console.dir({flagLayout, dotWidth, dotSpacing, x, y, width, height, baseY});
  const columnOffset = {
    x: dotSpacing * Math.sin(Math.PI / 3),
    y: dotSpacing / 2,
  };

  const circles = flagLayout.reduce((out, columnDots, columnIndex) => {
    const columnX = -(columnIndex * columnOffset.x);
    const columnY = baseY + (columnIndex * columnOffset.y);

    columnDots.split('').forEach((dot, dotIndex) => {
      const dotY = columnY + (dotIndex * dotSpacing);

      const { isDot, isFiltered, isRelevant } = parseFlags(dot);

      if (isDot) {
        // Placeholder color for now, these will be ProjectDots at some point anyway
        out.push({
          cx: x + columnX,
          cy: y + dotY,
          r: dotWidth / 2,
          filtered: isFiltered,
          relevant: isRelevant,
        });
      }
    });

    return out;
  }, []);

  return (
    <g>
      {
        circles.map(circle => (
          <ProjectDot
            key={`${circle.cx},${circle.cy}`}
            {...circle}
          />
        ))
      }
    </g>
  );
};

CompanyFlag.propTypes = {
  flagLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
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
