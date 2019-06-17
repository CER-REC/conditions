import React from 'react';
import PropTypes from 'prop-types';
import ProjectDot from '../../ProjectDot';

const CompanyFlag = ({
  flagLayout,
  dotWidth,
  dotSpacing,
  x,
  y,
  svgHeight,
  rotation,
  relevantProjects,
  filteredProjects,
}) => {
  if (!flagLayout) { return null; }

  const baseY = y + svgHeight - (flagLayout[0].length * dotSpacing);

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
          filtered: filteredProjects.includes(flagLayout[columnIndex][dotIndex]),
          relevant: relevantProjects.includes(flagLayout[columnIndex][dotIndex]),
        });
      }
    });

    return out;
  }, []);

  return (
    <g className="CompanyFlag" transform={`rotate(${rotation})`}>
      {circles.map(circle => (<ProjectDot key={`${circle.cx},${circle.cy}`} {...circle} />))}
    </g>
  );
};

CompanyFlag.propTypes = {
  flagLayout: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ),
  ).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  svgHeight: PropTypes.number.isRequired,
  dotWidth: PropTypes.number,
  dotSpacing: PropTypes.number,
  rotation: PropTypes.number,
  relevantProjects: PropTypes.arrayOf(PropTypes.number),
  filteredProjects: PropTypes.arrayOf(PropTypes.number),
};

CompanyFlag.defaultProps = {
  x: 0,
  y: 0,
  dotWidth: 16,
  dotSpacing: 24,
  rotation: 0,
  relevantProjects: [],
  filteredProjects: [],
};

export default CompanyFlag;
