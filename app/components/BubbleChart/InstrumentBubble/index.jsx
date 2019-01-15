import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';
import './styles.scss';

/* TODO:
1) Check if the text is overlapping another and change arc accordingly
2) Check if the inside text is smaller than circle radius, and shift the text
3) Add to onClick function to mimic design document functionality
*/

const pickColor = (category) => {
  switch (category) {
    case 'routing': return '#0E2B8C';
    case 'construction': return '#27A5F9';
    case 'abandonment': return '#164EF8';
    case 'misc': return '#D4A92A';
    case 'safety': return '#C904C2';
    case 'tariffs': return '#C3E6B3';
    case 'opening': return '#6AE6B2';
    default: return 'white';
  }
};

class InstrumentBubble extends React.PureComponent {
  static propTypes = {
    instrumentChartData: PropTypes.instanceOf(Object).isRequired, // Placeholder
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  circleRender = nodes => (
    nodes.filter(v => (v.depth !== 0))
      .map((node) => {
        // Renders parent circles (ie Energy bubbles)
        if (node.depth === 1) {
          // Create curved path for parentNode text
          const textCurvedPath = `
          M ${(node.x - node.r)} ${(node.y - 1)}
          A ${node.r} ${node.r} 0 0 1 ${(node.x + node.r)} ${(node.y - 1)}`;
          return (
            <g key={node.data.parentName}>
              <path
                id={`${node.data.parentName}path`}
                d={textCurvedPath}
                style={{ fill: 'none', stroke: 'transparent' }}
              />
              <circle
                className="CommodityCircle"
                {...handleInteraction(this.props.onClick)}
                transform={`translate(${node.x} ${node.y})`}
                r={node.r}
              />
              <text className="bubbleTitle">
                <FormattedMessage id={`common.instrument.type.${node.data.parentName}`}>
                  {text => (
                    <textPath
                      href={`#${node.data.parentName}path`}
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
        // Nested Children circles (ie Instruments)
        return (
          <g
            key={node.data.name}
          >
            <circle
              className="InstrumentTextCircle"
              r={node.r}
              transform={`translate(${node.x} ${node.y})`}
            />
            <circle
              {...handleInteraction(this.props.onClick)}
              r={node.value}
              transform={`translate(${node.x} ${node.y})`}
              style={{ fill: pickColor(node.data.category) }}
            />
            <text
              x={textX}
              y={node.y}
              textAnchor={textStyle}
              alignmentBaseline="middle"
              stroke="transparent"
              fill={textColor}
            >{node.data.name}
            </text>
          </g>
        );
      })
  )

  d3HierarchyCalculation() {
    const { width, height, instrumentChartData } = this.props;
    //  d3 pack generates a function to
    // fit data into tightly packed circles
    // Renders all the circle propertly
    // with proper thickness so it always fits the circle.
    const pack = d3.pack()
      .size([width, height])
      .padding(node => (node.depth === 0 ? 0 : 5))
      .radius((node) => {
        const characterWidth = 8;
        const textLength = (node.data.name).length * characterWidth;
        const textHeight = 15;
        const textLengthExceeds = (node.value * 2 <= textLength);
        if (textLengthExceeds) {
          return (node.value) + (textLength); // buffer
        }
        if (node.value < textHeight) {
          return node.value + textHeight;
        }
        return node.value;
      });
    // creates the root node using
    // d3 hierarchy similar to a tree layout
    const root = d3.hierarchy(instrumentChartData)
      .sum(totalData => totalData.value)
      .sort((a, b) => (b.value - a.value));
    return pack(root).descendants();
  }

  render() {
    const { width, height } = this.props;
    const d3Calculation = this.d3HierarchyCalculation();
    return (
      <svg width={width} height={height} className="InstrumentBubble">
        {this.circleRender(d3Calculation)}
      </svg>
    );
  }
}

export default InstrumentBubble;
