import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';
import './styles.scss';
import { features } from '../../../constants';

/* TODO:
1) Check if the text is overlapping another and change arc accordingly
*/

const InstrumentBubble = (props) => {
  const {
    onClick, d3Calculation, keyPress,
  } = props;
  const circles = d3Calculation
    .map((node) => {
      // Don't render the circle surrounding instrument or commodity
      if (node.depth <= 1) { return null; }
      // Renders commodity circles (ie Energy bubbles)
      if (node.depth === 2) {
      // Create curved path for parentNode text
        const textCurvedPath = `
          M ${(node.x - node.r)} ${(node.y - 1)}
          A ${node.r} ${node.r} 0 0 1 ${(node.x + node.r)} ${(node.y - 1)}`;
        return (
          <g key={node.data.name} data-name={node.data.name}>
            <path
              id={`${node.data.name}path`}
              d={textCurvedPath}
              style={{ fill: 'none', stroke: 'transparent' }}
            />
            <circle
              onKeyDown={keyPress}
              className="CommodityCircle"
              {...handleInteraction(onClick, node.data.name)}
              transform={`translate(${node.x} ${node.y})`}
              r={node.r}
              value={node.value}
            />
            <text className="bubbleTitle">
              <FormattedMessage id={`common.instrumentCommodityType.${node.data.name}`}>
                {text => (
                  <textPath
                    href={`#${node.data.name}path`}
                    textAnchor="middle"
                    startOffset="50%"
                  >
                    {text}
                  </textPath>
                )}
              </FormattedMessage>
            </text>
          </g>
        );
      }
      // Determines text position and color
      // Depends upon text length relative to circle size
      const textX = node.r > node.value ? (node.x + (node.value + 2)) : node.x;
      const textStyle = node.r > node.value ? '' : 'middle';
      const textColor = node.r > node.value ? 'black' : 'white';
      return (
        <g
          key={node.data.name}
          onKeyDown={keyPress}
          data-name={node.data.name}
          {...handleInteraction(onClick, node.data.name)}
        >
          <circle
            r={node.value}
            transform={`translate(${node.x} ${node.y})`}
            style={{ fill: features.instrument[node.data.category] || 'white' }}
          />
          <text
            x={textX}
            y={node.y}
            textAnchor={textStyle}
            alignmentBaseline="middle"
            stroke="transparent"
            fill={textColor}
          >
            {node.data.name}
          </text>
        </g>
      );
    });
    // Nested Children circles (ie Instruments)
  return (
    <g className="InstrumentBubble">
      {circles}
    </g>
  );
};
InstrumentBubble.propTypes = {
  onClick: PropTypes.func.isRequired,
  keyPress: PropTypes.func.isRequired,
  d3Calculation: PropTypes.instanceOf(Object).isRequired,
};

export default InstrumentBubble;
