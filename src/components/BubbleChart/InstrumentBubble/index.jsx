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
  const { onClick, d3Calculation, keyPress } = props;
  const circles = d3Calculation
    .map((node) => {
      // Don't render the circle surrounding instrument or commodity
      if (node.depth <= 1) { return null; }

      const circleTransform = `translate(${node.x.toFixed(8)} ${node.y.toFixed(8)})`;
      const textOutside = node.r > node.value;

      let content = (
        <React.Fragment>
          <circle
            style={{ fill: features.instrument[node.data.category] || 'white' }}
            r={node.value}
            transform={circleTransform}
          />
          <text
            x={textOutside ? (node.x + (node.value + 2)) : node.x}
            y={node.y.toFixed(8)}
            textAnchor={textOutside ? '' : 'middle'}
            alignmentBaseline="middle"
            stroke="transparent"
            fill={textOutside ? 'black' : 'white'}
          >
            {node.data.name}
          </text>
        </React.Fragment>
      );

      // Renders commodity circles (ie Energy bubbles)
      if (node.depth === 2) {
        // Create curved path for parentNode text
        const textCurvedPath = `
          M ${(node.x - node.r).toFixed(8)} ${(node.y - 1).toFixed(8)}
          A ${node.r} ${node.r} 0 0 1 ${(node.x + node.r).toFixed(8)} ${(node.y - 1).toFixed(8)}`;
        content = (
          <React.Fragment>
            <circle
              className="CommodityCircle"
              r={node.r}
              transform={circleTransform}
            />
            <path
              id={`${node.data.name}path`}
              d={textCurvedPath}
              style={{ fill: 'none', stroke: 'transparent' }}
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
          </React.Fragment>
        );
      }

      return (
        <g
          key={node.data.name}
          onKeyDown={keyPress}
          data-name={node.data.name}
          {...handleInteraction(onClick, node.data.name)}
        >
          {content}
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
